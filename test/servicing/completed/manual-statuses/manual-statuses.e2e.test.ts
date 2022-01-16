import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import moment from "moment";

import { AppModule } from "../../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../src/models/BaseModel";
import db from "../../../../src/db";
import { ManualStatus } from "../../../../src/v2/modules/cases/completed/manual-statuses/manual-status.interface";
import {
  createCase,
  addTerm,
  wait,
  convertToDip,
  convertToCompleted,
} from "../utils/shared-requests";

describe("ManualStatus (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    BaseModel.registerKnex(db);
    connectWithCurrentApp(app);
    await app.init();
  });

  it("ManualStatus (POST GET DELETE HISTORICAL)", async (done) => {
    const manualStatus: ManualStatus = {
      Status: "Non-Performing – Delinquent",
      EffectiveFrom: "2020-12-07T00:00:00.000Z",
    };

    const nextManualStatus: ManualStatus = {
      Status: "Non-Performing – Arrears",
      EffectiveFrom: "2020-12-08T00:00:00.000Z",
    };

    const prevStatus: ManualStatus = {
      Status: "Revert to Automatic Status",
      EffectiveFrom: "2020-12-07T00:00:00.000Z",
    };

    const beforeCompletionStatus: ManualStatus = {
      Status: "Revert to Automatic Status",
      EffectiveFrom: "2020-12-06T00:00:00.000Z",
    };

    let caseId: string;
    let timestamp: string;
    let manualStatusId: number;
    const server = app.getHttpServer();
    return waterfall(
      [
        (cb: request.CallbackHandler) => createCase(server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          caseId = results.body.data.id;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          convertToDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          addTerm(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          convertToCompleted(caseId, server, cb, "2020-12-07"),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/manualStatuses`)
            .send(beforeCompletionStatus)
            .expect(400, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.message).toBe(
            "Manual status can not be set before completion date"
          );
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/manualStatuses`)
            .send(manualStatus)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/manualStatuses`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdManualStatus: ManualStatus =
            results.body[results.body.length - 1];
          expect(createdManualStatus).toEqual(
            expect.objectContaining(manualStatus)
          );
          timestamp = moment().format().replace("+", "%2B");

          manualStatusId = createdManualStatus.ManualStatusId;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          wait(cb, 1000),
        (results: request.Response, cb: request.CallbackHandler) => {
          timestamp = moment().format().replace("+", "%2B");
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          wait(cb, 1000),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/manualStatuses`)
            .send(nextManualStatus)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/manualStatuses`)
            .send(prevStatus)
            .expect(400, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.message).toBe(
            "New status can not be set before existing manual status"
          );
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .delete(
              `/cases/${caseId}/completed/manualStatuses/${manualStatusId}`
            )
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/manualStatuses`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(1);
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(
              `/cases/${caseId}/completed/manualStatuses/historical?timestamp=${timestamp}`
            )
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(1);
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { completed } = results.body;
          expect(completed).toEqual(
            expect.objectContaining({
              status: nextManualStatus.Status,
              lastStatus: expect.objectContaining(nextManualStatus),
            })
          );
          cb(null, results);
          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });
  afterAll(async () => {
    await app.close();
  });
});

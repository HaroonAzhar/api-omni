import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import moment from "moment";

import { AppModule } from "../../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../src/models/BaseModel";
import db from "../../../../src/db";
import { Extension } from "../../../../src/v2/modules/cases/completed/extensions/extension.interface";
import {
  createCase,
  addTerm,
  wait,
  convertToDip,
  convertToCompleted,
} from "../utils/shared-requests";

describe("Extension (e2e)", () => {
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

  it("Extension (POST GET DELETE HISTORICAL)", async (done) => {
    const extension: Extension = {
      InterestRate: 2.0,
      Date: "2021-12-07T00:00:00.000Z",
    };

    const prevExtension: Extension = {
      InterestRate: 1.0,
      Date: "2021-12-06T00:00:00.000Z",
    };

    const nextExtension: Extension = {
      InterestRate: 1.0,
      Date: "2021-12-08T00:00:00.000Z",
    };

    let caseId: string;
    let timestamp: string;
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
            .post(`/cases/${caseId}/completed/extensions`)
            .send(extension)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/extensions`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdExtension = results.body[results.body.length - 1];
          expect(createdExtension).toEqual(expect.objectContaining(extension));
          timestamp = moment().format().replace("+", "%2B");

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
            .post(`/cases/${caseId}/completed/extensions`)
            .send(nextExtension)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/extensions`)
            .send(prevExtension)
            .expect(400, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.message).toBe(
            "The extension date can not be the same or before the maturity date"
          );
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(
              `/cases/${caseId}/completed/extensions/historical?timestamp=${timestamp}`
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
              currentDateOfMaturity: nextExtension.Date,
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

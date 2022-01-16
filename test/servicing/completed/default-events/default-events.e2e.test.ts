import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import moment from "moment";

import { AppModule } from "../../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../src/models/BaseModel";
import db from "../../../../src/db";
import { DefaultEvent } from "../../../../src/v2/modules/cases/completed/default-events/default-event.interface";
import { wait, createCase, convertToCompleted } from "../utils/shared-requests";

describe("DefaultEvent (e2e)", () => {
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

  it("DefaultEvent (POST GET DELETE HISTORICAL)", async (done) => {
    const defaultEvent: DefaultEvent = {
      Type: "Start",
      Date: "2021-12-07T00:00:00.000Z",
    };
    const defaultEventDto = {
      ...defaultEvent,
    };
    let caseId: string;
    let defaultEventId: number;
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
          convertToCompleted(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/defaultEvents`)
            .send(defaultEventDto)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/defaultEvents`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdDefaultEvent = results.body[results.body.length - 1];
          expect(createdDefaultEvent).toEqual(
            expect.objectContaining(defaultEvent)
          );
          defaultEventId = createdDefaultEvent.DefaultEventId;

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
            .delete(
              `/cases/${caseId}/completed/defaultEvents/${defaultEventId}`
            )
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/defaultEvents`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(0);
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(
              `/cases/${caseId}/completed/defaultEvents/historical?timestamp=${timestamp}`
            )
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(1);
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/defaultEvents`)
            .send(defaultEventDto)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/defaultEvents`)
            .send(defaultEventDto)
            .expect(400, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.message).toBe(
            "Only one event can exist for a given date"
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

  it("DefaultEvent periods", async (done) => {
    const defaultEventStart: DefaultEvent = {
      Type: "Start",
      Date: "2021-12-07T00:00:00.000Z",
    };

    const defaultEventEnd: DefaultEvent = {
      Type: "End",
      Date: "2021-12-12T00:00:00.000Z",
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
          convertToCompleted(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/defaultEvents`)
            .send(defaultEventStart)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/defaultEvents`)
            .send(defaultEventEnd)
            .expect(201, cb),
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
            .get(
              `/cases/${caseId}/completed/defaultEvents/periods?timestamp=${timestamp}`
            )
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(1);
          expect(results.body[0]).toEqual({
            start_from: defaultEventStart.Date,
            to: defaultEventEnd.Date,
          });

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

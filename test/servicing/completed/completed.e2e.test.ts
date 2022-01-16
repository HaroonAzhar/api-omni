import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../src/models/BaseModel";
import db from "../../../src/db";
import { createCase, convertToDip, addTerm } from "../../requests";

describe("Completed (e2e)", () => {
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

  it("Completed (GET)", async (done) => {
    const DateOfCompletion = "2020-12-07";

    let caseId: string;
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
          request(server)
            .post(`/cases/${caseId}/stage`)
            .send({ Stage: "completed", DateOfCompletion })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}/completed`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const completed = results.body;
          expect(completed).toEqual(
            expect.objectContaining({
              DateOfCompletion: "2020-12-07T00:00:00.000Z",
              DateOfMaturity: "2021-12-06T00:00:00.000Z",
            })
          );
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/stage`)
            .send({ Stage: "completed", DateOfCompletion: "2020-04-07" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}/completed`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const completed = results.body;
          expect(completed).toEqual(
            expect.objectContaining({
              DateOfCompletion: "2020-04-07T00:00:00.000Z",
              DateOfMaturity: "2021-04-06T00:00:00.000Z",
            })
          );
          cb(null, results);
        },

        () => done(),
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

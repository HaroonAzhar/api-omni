import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../src/models/BaseModel";
import db from "../../../src/db";
import { createCase, convertToCaseSummary } from "../../requests";

describe("Case Summary (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    BaseModel.registerKnex(db);
    connectWithCurrentApp(app);
    await app.init();
  });

  it("Convert Case Summary (POST GET)", async (done) => {
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
          convertToCaseSummary(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.Stage).toBe("case_summary");
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) => {
          cb(null, results);
          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });

  it("Modify Expected Completion Date", async (done) => {
    let caseId: string;
    const server = app.getHttpServer();
    const ExpectedCompletionDate = "2021-08-23";
    return waterfall(
      [
        (cb: request.CallbackHandler) => createCase(server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          caseId = results.body.data.id;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          convertToCaseSummary(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/caseSummary/expectedCompletionDate`)
            .send({ ExpectedCompletionDate })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.caseSummary.ExpectedCompletionDate).toBe(
            "2021-08-23T00:00:00.000Z"
          );
          cb(null, results);
        },

        () => {
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

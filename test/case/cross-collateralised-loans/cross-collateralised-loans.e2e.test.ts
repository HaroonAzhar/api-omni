import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../src/models/BaseModel";
import db from "../../../src/db";
import { createCase, convertToCompleted } from "../../requests";

describe("Case cross-collateralised-loans (e2e)", () => {
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

  it("cross-collateralised-loans (POST GET DELETE)", async (done) => {
    let caseId: string;
    let otherCaseId: string;

    const server = app.getHttpServer();
    return waterfall(
      [
        (cb: request.CallbackHandler) => createCase(server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          caseId = results.body.data.id;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          createCase(server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          otherCaseId = results.body.data.id;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/crossCollateralisedLoans`)
            .send({ otherCaseUuid: otherCaseId })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { crossCollateralisedLoans } = results.body;
          expect(crossCollateralisedLoans.length).toBe(0);
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          convertToCompleted(otherCaseId, server, cb, "2020-12-07"),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { crossCollateralisedLoans } = results.body;
          expect(crossCollateralisedLoans.length).toBe(1);
          const [crossCollateralisedLoan] = crossCollateralisedLoans;
          expect(crossCollateralisedLoan).toEqual(
            expect.objectContaining({ caseUuid: otherCaseId })
          );
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${otherCaseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { crossCollateralisedLoans } = results.body;
          expect(crossCollateralisedLoans.length).toBe(0);
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          convertToCompleted(caseId, server, cb, "2020-12-07"),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${otherCaseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { crossCollateralisedLoans } = results.body;
          expect(crossCollateralisedLoans.length).toBe(1);
          const [crossCollateralisedLoan] = crossCollateralisedLoans;
          expect(crossCollateralisedLoan).toEqual(
            expect.objectContaining({ caseUuid: caseId })
          );
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .delete(`/cases/${caseId}/crossCollateralisedLoans/${otherCaseId}`)
            .expect(200, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { crossCollateralisedLoans } = results.body;
          expect(crossCollateralisedLoans.length).toBe(0);
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${otherCaseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { crossCollateralisedLoans } = results.body;
          expect(crossCollateralisedLoans.length).toBe(0);
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

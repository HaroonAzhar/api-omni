import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../src/models/BaseModel";
import db from "../../../../src/db";
import { Cashflow } from "../../../../src/v2/modules/cases/completed/cashflows/cashflow.interface";
import {
  createCase,
  addTerm,
  convertToDip,
  convertToCompleted,
} from "../utils/shared-requests";

describe("Cashflow (e2e)", () => {
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

  it("Cashflow (POST GET)", async (done) => {
    const cashflow: Cashflow = {
      Amount: 100,
      Description: "note",
      ActualDate: "2021-03-20T00:00:00.000Z",
    };

    const nextCashflow: Cashflow = {
      Amount: 200,
      Description: "note2",
      ActualDate: "2021-03-22T00:00:00.000Z",
    };

    let caseId: string;
    const timestamp = "2021-03-21";
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
            .post(`/cases/${caseId}/completed/cashflows`)
            .send(cashflow)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/cashflows`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdCashflow: Cashflow =
            results.body[results.body.length - 1];
          expect(createdCashflow).toEqual(expect.objectContaining(cashflow));
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/cashflows`)
            .send(nextCashflow)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/cashflows`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(2);
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(
              `/cases/${caseId}/completed/cashflows?ActualDateMin=${timestamp}`
            )
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(1);
          const createdCashflow: Cashflow =
            results.body[results.body.length - 1];
          expect(createdCashflow).toEqual(
            expect.objectContaining(nextCashflow)
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

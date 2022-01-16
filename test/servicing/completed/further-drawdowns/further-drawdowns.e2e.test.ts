import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../src/models/BaseModel";
import db from "../../../../src/db";
import { FurtherDrawdown } from "../../../../src/v2/modules/cases/completed/further-drawdowns/further-drawdown.interface";
import { CreateFurtherDrawdownDto } from "../../../../src/v2/modules/cases/completed/further-drawdowns/dtos/create-further-drawdown.dto";
import {
  createCase,
  convertToDip,
  convertToCompleted,
} from "../utils/shared-requests";
import { generateFinancialDetails } from "../../../case/dip/helpers/generate-financial-details-content";

describe("FurtherDrawdown (e2e)", () => {
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

  it("FurtherDrawdown (POST GET)", async (done) => {
    const furtherDrawdown: CreateFurtherDrawdownDto = {
      RequestedAmount: 1000,
      CumulativeBalance: 100,
      LTGDV: 0.8,
      LTV: 0.9,
      TotalGDV: 2000,
      TotalValuations: 1500,
      Notes: "foo",
      RequestedDate: "2021-03-20T00:00:00.000Z",
    };

    const financialDetails = generateFinancialDetails();
    financialDetails.FurtherDrawDowns = 100000;
    const remainingFunds =
      financialDetails.FurtherDrawDowns - furtherDrawdown.RequestedAmount;

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
          request(server)
            .post(`/cases/${caseId}/dip/financial_details`)
            .send(financialDetails)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          convertToCompleted(caseId, server, cb, "2020-12-07"),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/furtherDrawdowns`)
            .send(furtherDrawdown)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdFurtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          expect(results.body.length).toBe(1);
          expect(createdFurtherDrawdown).toEqual(
            expect.objectContaining(furtherDrawdown)
          );
          expect(createdFurtherDrawdown.remainingFunds).toBe(remainingFunds);
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}/completed`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const completed = results.body;
          expect(completed.availableDrawdownFunds).toBe(remainingFunds);
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

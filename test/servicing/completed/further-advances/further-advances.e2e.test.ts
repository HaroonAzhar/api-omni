import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../src/models/BaseModel";
import db from "../../../../src/db";
import { FurtherAdvance } from "../../../../src/v2/modules/cases/completed/further-advances/further-advance.interface";
import { CreateFurtherAdvanceDto } from "../../../../src/v2/modules/cases/completed/further-advances/dtos/create-further-advance.dto";
import {
  createCase,
  convertToDip,
  convertToCompleted,
} from "../utils/shared-requests";
import { generateFinancialDetails } from "../../../case/dip/helpers/generate-financial-details-content";

describe("FurtherAdvance (e2e)", () => {
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

  it("FurtherAdvance (POST GET)", async (done) => {
    const furtherAdvance: CreateFurtherAdvanceDto = {
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
            .post(`/cases/${caseId}/completed/furtherAdvances`)
            .send(furtherAdvance)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherAdvances`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdFurtherAdvance: FurtherAdvance =
            results.body[results.body.length - 1];
          expect(results.body.length).toBe(1);
          expect(createdFurtherAdvance).toEqual(
            expect.objectContaining(furtherAdvance)
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

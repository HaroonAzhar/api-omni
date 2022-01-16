import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import { AppModule } from "@v2/modules/app/app.module";
import { CreateFurtherDrawdownDto } from "@v2/modules/cases/completed/further-drawdowns/dtos/create-further-drawdown.dto";

import connectWithCurrentApp from "../../../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../../../src/models/BaseModel";
import db from "../../../../../../src/db";
import {
  createCase,
  convertToDip,
  convertToCompleted,
} from "../../../utils/shared-requests";
import { FurtherDrawdown } from "../../../../../../src/v2/modules/cases/completed/further-drawdowns/further-drawdown.interface";
import { SignatureDto } from "../../../../../../src/v2/modules/cases/completed/further/signature/signature.dto";

describe("OriginationChecklistDrawDownRequest (e2e)", () => {
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

  it("OriginationChecklistDrawDownRequest (POST GET)", async (done) => {
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
    const primarySignature: SignatureDto = {
      Date: new Date("2021-04-20"),
      User: "foo",
    };
    const secondarySignature: SignatureDto = {
      Date: new Date("2021-04-21"),
      User: "bar",
    };
    let caseId: string;
    let furtherDrawdownId: number;
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
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          furtherDrawdownId = furtherDrawdown.FurtherDrawdownId;
          expect(furtherDrawdown.originationChecklist).toBeDefined();
          const { drawDownRequest } = furtherDrawdown.originationChecklist;
          expect(drawDownRequest.primarySignature).toBeUndefined();

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/originationChecklist/drawDownRequest/primarySignature`
            )
            .send(primarySignature)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { drawDownRequest } = furtherDrawdown.originationChecklist;
          expect(drawDownRequest.primarySignature.User).toBe(
            primarySignature.User
          );
          expect(drawDownRequest.primarySignature.Date).toBe(
            primarySignature.Date.toISOString()
          );
          expect(drawDownRequest.secondarySignature).toBeUndefined();
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/originationChecklist/drawDownRequest/secondarySignature`
            )
            .send(secondarySignature)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { drawDownRequest } = furtherDrawdown.originationChecklist;
          expect(drawDownRequest.secondarySignature.User).toBe(
            secondarySignature.User
          );
          expect(drawDownRequest.secondarySignature.Date).toBe(
            secondarySignature.Date.toISOString()
          );
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/originationChecklist/drawDownRequest/signatories`
            )
            .send({ Signatories: "Signatories" })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { drawDownRequest } = furtherDrawdown.originationChecklist;
          expect(drawDownRequest.Signatories).toBe("Signatories");
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/originationChecklist/drawDownRequest/amountEnteredMatchesAmount`
            )
            .send({ AmountEnteredMatchesAmount: true })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { drawDownRequest } = furtherDrawdown.originationChecklist;
          expect(drawDownRequest.AmountEnteredMatchesAmount).toBe(true);
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
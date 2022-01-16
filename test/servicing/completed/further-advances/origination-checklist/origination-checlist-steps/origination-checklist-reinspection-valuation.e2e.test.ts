import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import { AppModule } from "@v2/modules/app/app.module";
import { CreateFurtherAdvanceDto } from "@v2/modules/cases/completed/further-advances/dtos/create-further-advance.dto";

import connectWithCurrentApp from "../../../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../../../src/models/BaseModel";
import db from "../../../../../../src/db";
import {
  createCase,
  convertToDip,
  convertToCompleted,
} from "../../../utils/shared-requests";
import { FurtherAdvance } from "../../../../../../src/v2/modules/cases/completed/further-advances/further-advance.interface";
import { SignatureDto } from "../../../../../../src/v2/modules/cases/completed/further/signature/signature.dto";

describe("OriginationChecklistReinspectionValuation (e2e)", () => {
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

  it("OriginationChecklistReinspectionValuation (POST GET)", async (done) => {
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
    const primarySignature: SignatureDto = {
      Date: new Date("2021-04-20"),
      User: "foo",
    };
    const secondarySignature: SignatureDto = {
      Date: new Date("2021-04-21"),
      User: "bar",
    };
    let caseId: string;
    let furtherAdvanceId: number;
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
            .post(`/cases/${caseId}/completed/furtherAdvances`)
            .send(furtherAdvance)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherAdvances`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherAdvance: FurtherAdvance =
            results.body[results.body.length - 1];
          furtherAdvanceId = furtherAdvance.FurtherAdvanceId;
          expect(furtherAdvance.originationChecklist).toBeDefined();
          const {
            reinspectionValuation,
          } = furtherAdvance.originationChecklist;
          expect(reinspectionValuation.primarySignature).toBeUndefined();

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherAdvances/${furtherAdvanceId}/originationChecklist/reinspectionValuation/primarySignature`
            )
            .send(primarySignature)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherAdvances`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherAdvance: FurtherAdvance =
            results.body[results.body.length - 1];
          const {
            reinspectionValuation,
          } = furtherAdvance.originationChecklist;
          expect(reinspectionValuation.primarySignature.User).toBe(
            primarySignature.User
          );
          expect(reinspectionValuation.primarySignature.Date).toBe(
            primarySignature.Date.toISOString()
          );
          expect(reinspectionValuation.secondarySignature).toBeUndefined();
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherAdvances/${furtherAdvanceId}/originationChecklist/reinspectionValuation/secondarySignature`
            )
            .send(secondarySignature)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherAdvances`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherAdvance: FurtherAdvance =
            results.body[results.body.length - 1];
          const {
            reinspectionValuation,
          } = furtherAdvance.originationChecklist;
          expect(reinspectionValuation.secondarySignature.User).toBe(
            secondarySignature.User
          );
          expect(reinspectionValuation.secondarySignature.Date).toBe(
            secondarySignature.Date.toISOString()
          );
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherAdvances/${furtherAdvanceId}/originationChecklist/reinspectionValuation/addressMatches`
            )
            .send({ AddressMatches: true })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherAdvances/${furtherAdvanceId}/originationChecklist/reinspectionValuation/addressedToCorrect`
            )
            .send({ AddressedToCorrect: true })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherAdvances/${furtherAdvanceId}/originationChecklist/reinspectionValuation/signedAndDated`
            )
            .send({ SignedAndDated: true })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherAdvances/${furtherAdvanceId}/originationChecklist/reinspectionValuation/valuerOnApproved`
            )
            .send({ ValuerOnApproved: true })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherAdvances/${furtherAdvanceId}/originationChecklist/reinspectionValuation/within3Months`
            )
            .send({ Within3Months: true })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherAdvances`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherAdvance: FurtherAdvance =
            results.body[results.body.length - 1];
          const {
            reinspectionValuation,
          } = furtherAdvance.originationChecklist;
          expect(reinspectionValuation.AddressMatches).toBe(true);
          expect(reinspectionValuation.AddressedToCorrect).toBe(true);
          expect(reinspectionValuation.SignedAndDated).toBe(true);
          expect(reinspectionValuation.ValuerOnApproved).toBe(true);
          expect(reinspectionValuation.Within3Months).toBe(true);

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

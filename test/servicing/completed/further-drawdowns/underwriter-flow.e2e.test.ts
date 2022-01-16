import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import { AppModule } from "@v2/modules/app/app.module";
import { CreateFurtherDrawdownDto } from "@v2/modules/cases/completed/further-drawdowns/dtos/create-further-drawdown.dto";

import connectWithCurrentApp from "../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../src/models/BaseModel";
import db from "../../../../src/db";
import {
  createCase,
  convertToDip,
  convertToCompleted,
} from "../utils/shared-requests";
import { FurtherDrawdown } from "../../../../src/v2/modules/cases/completed/further-drawdowns/further-drawdown.interface";
import {
  SignatureDto,
  SignatureWithCommentDto,
} from "../../../../src/v2/modules/cases/completed/further/signature/signature.dto";

describe("UnderwriterFlow (e2e)", () => {
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

  it("UnderwriterFlow (POST GET)", async (done) => {
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

    const returnData: SignatureWithCommentDto = {
      Date: new Date("2021-04-22"),
      User: "baz",
      Comment: "comment",
    };
    const approvalData: SignatureDto = {
      Date: new Date("2021-04-23"),
      User: "submit",
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
          expect(furtherDrawdown.underwriterFlow).toBeDefined();
          const { UnderwriterApprovalDate } = furtherDrawdown.underwriterFlow;
          expect(UnderwriterApprovalDate).toBeNull();

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/underwriterFlow/writeUpDate`
            )
            .send({ WriteUpDate: "2021-04-27" })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { WriteUpDate } = furtherDrawdown.underwriterFlow;
          expect(WriteUpDate).toBe(new Date("2021-04-27").toISOString());
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/underwriterFlow/assessmentOfExitViability`
            )
            .send({ AssessmentOfExitViability: "AssessmentOfExitViability" })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { AssessmentOfExitViability } = furtherDrawdown.underwriterFlow;
          expect(AssessmentOfExitViability).toBe("AssessmentOfExitViability");
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/underwriterFlow/descriptionOfWorks`
            )
            .send({ DescriptionOfWorks: "DescriptionOfWorks" })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { DescriptionOfWorks } = furtherDrawdown.underwriterFlow;
          expect(DescriptionOfWorks).toBe("DescriptionOfWorks");
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/underwriterFlow/assessmentOfProgress`
            )
            .send({ AssessmentOfProgress: "AssessmentOfProgress" })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { AssessmentOfProgress } = furtherDrawdown.underwriterFlow;
          expect(AssessmentOfProgress).toBe("AssessmentOfProgress");
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/underwriterFlow/risksConcerns`
            )
            .send({ RisksConcerns: "RisksConcerns" })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { RisksConcerns } = furtherDrawdown.underwriterFlow;
          expect(RisksConcerns).toBe("RisksConcerns");
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/underwriterFlow/return`
            )
            .send(returnData)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { ReturnComment, ReturnDate } = furtherDrawdown.underwriterFlow;
          expect(ReturnComment).toBe(returnData.Comment);
          expect(ReturnDate).toBe(returnData.Date.toISOString());

          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/underwriterFlow/approve`
            )
            .send(approvalData)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { UnderwriterApprovalDate } = furtherDrawdown.underwriterFlow;
          expect(UnderwriterApprovalDate).toBe(approvalData.Date.toISOString());

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

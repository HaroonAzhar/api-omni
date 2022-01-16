import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import { AppModule } from "@v2/modules/app/app.module";
import { CreateFurtherDrawdownDto } from "@v2/modules/cases/completed/further-drawdowns/dtos/create-further-drawdown.dto";

import connectWithCurrentApp from "../../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../../src/models/BaseModel";
import db from "../../../../../src/db";
import {
  createCase,
  convertToDip,
  convertToCompleted,
} from "../../utils/shared-requests";
import { FurtherDrawdown } from "../../../../../src/v2/modules/cases/completed/further-drawdowns/further-drawdown.interface";
import {
  SignatureDto,
  SignatureWithCommentDto,
} from "../../../../../src/v2/modules/cases/completed/further/signature/signature.dto";

describe("OriginationChecklist (e2e)", () => {
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

  it("OriginationChecklist (POST GET)", async (done) => {
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
    const initialCheckData: SignatureDto = {
      Date: new Date("2021-04-20"),
      User: "foo",
    };
    const finalSignOfData: SignatureDto = {
      Date: new Date("2021-04-21"),
      User: "bar",
    };

    const closeData: SignatureWithCommentDto = {
      Date: new Date("2021-04-22"),
      User: "baz",
      Comment: "comment",
    };
    const submitData: SignatureDto = {
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
          expect(furtherDrawdown.originationChecklist).toBeDefined();
          const {
            initialCheck,
            finalSignOf,
            close,
            submitToUnderwriter,
          } = furtherDrawdown.originationChecklist;
          expect(initialCheck.Date).toBeNull();
          expect(finalSignOf.Date).toBeNull();
          expect(close.Date).toBeNull();
          expect(submitToUnderwriter.Date).toBeNull();

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/originationChecklist/initialCheck`
            )
            .send(initialCheckData)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { initialCheck } = furtherDrawdown.originationChecklist;
          expect(initialCheck.User).toBe(initialCheckData.User);
          expect(initialCheck.Date).toBe(initialCheckData.Date.toISOString());
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/originationChecklist/finalSignOf`
            )
            .send(finalSignOfData)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { finalSignOf } = furtherDrawdown.originationChecklist;
          expect(finalSignOf.User).toBe(finalSignOfData.User);
          expect(finalSignOf.Date).toBe(finalSignOfData.Date.toISOString());
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/originationChecklist/close`
            )
            .send(closeData)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { close } = furtherDrawdown.originationChecklist;
          expect(close.User).toBe(closeData.User);
          expect(close.Date).toBe(closeData.Date.toISOString());
          expect(close.Comment).toBe(closeData.Comment);

          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherDrawdowns/${furtherDrawdownId}/originationChecklist/submitToUnderwriter`
            )
            .send(submitData)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherDrawdown: FurtherDrawdown =
            results.body[results.body.length - 1];
          const { submitToUnderwriter } = furtherDrawdown.originationChecklist;
          expect(submitToUnderwriter.User).toBe(submitData.User);
          expect(submitToUnderwriter.Date).toBe(submitData.Date.toISOString());
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

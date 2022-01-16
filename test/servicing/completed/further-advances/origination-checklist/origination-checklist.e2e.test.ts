import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import { AppModule } from "@v2/modules/app/app.module";
import { CreateFurtherAdvanceDto } from "@v2/modules/cases/completed/further-advances/dtos/create-further-advance.dto";

import connectWithCurrentApp from "../../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../../src/models/BaseModel";
import db from "../../../../../src/db";
import {
  createCase,
  convertToDip,
  convertToCompleted,
} from "../../utils/shared-requests";
import { FurtherAdvance } from "../../../../../src/v2/modules/cases/completed/further-advances/further-advance.interface";
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
            initialCheck,
            finalSignOf,
            close,
            submitToUnderwriter,
          } = furtherAdvance.originationChecklist;
          expect(initialCheck.Date).toBeNull();
          expect(finalSignOf.Date).toBeNull();
          expect(close.Date).toBeNull();
          expect(submitToUnderwriter.Date).toBeNull();

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherAdvances/${furtherAdvanceId}/originationChecklist/initialCheck`
            )
            .send(initialCheckData)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherAdvances`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherAdvance: FurtherAdvance =
            results.body[results.body.length - 1];
          const { initialCheck } = furtherAdvance.originationChecklist;
          expect(initialCheck.User).toBe(initialCheckData.User);
          expect(initialCheck.Date).toBe(initialCheckData.Date.toISOString());
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherAdvances/${furtherAdvanceId}/originationChecklist/finalSignOf`
            )
            .send(finalSignOfData)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherAdvances`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherAdvance: FurtherAdvance =
            results.body[results.body.length - 1];
          const { finalSignOf } = furtherAdvance.originationChecklist;
          expect(finalSignOf.User).toBe(finalSignOfData.User);
          expect(finalSignOf.Date).toBe(finalSignOfData.Date.toISOString());
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherAdvances/${furtherAdvanceId}/originationChecklist/close`
            )
            .send(closeData)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherAdvances`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherAdvance: FurtherAdvance =
            results.body[results.body.length - 1];
          const { close } = furtherAdvance.originationChecklist;
          expect(close.User).toBe(closeData.User);
          expect(close.Date).toBe(closeData.Date.toISOString());
          expect(close.Comment).toBe(closeData.Comment);

          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/furtherAdvances/${furtherAdvanceId}/originationChecklist/submitToUnderwriter`
            )
            .send(submitData)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/furtherAdvances`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const furtherAdvance: FurtherAdvance =
            results.body[results.body.length - 1];
          const { submitToUnderwriter } = furtherAdvance.originationChecklist;
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

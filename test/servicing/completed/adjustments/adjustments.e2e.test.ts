import { Test, TestingModule } from "@nestjs/testing";
import { HttpServer, INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../src/models/BaseModel";
import db from "../../../../src/db";
import { CreateAdjustment } from "../../../../src/v2/modules/cases/completed/adjustments/adjustment.interface";
import { convertToCompleted } from "../utils/shared-requests";

const createCase = (server: HttpServer, cb: request.CallbackHandler) =>
  request(server)
    .post("/cases")
    .set("Accept", "application/vnd.api+json")
    .set("Content-Type", "application/vnd.api+json")
    .expect(200, cb);

describe("Adjustment (e2e)", () => {
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

  it("Adjustment (POST GET CORRECT DELETE)", async (done) => {
    const adjustment: CreateAdjustment = {
      ActualDate: "2021-03-07T00:00:00.000Z",
      Amount: 2000,
      BalanceEffect: "Increase",
      TransactionType: "Administration Fee",
    };

    let caseId: string;
    const server = app.getHttpServer();
    let adjustmentId: number;

    return waterfall(
      [
        (cb: request.CallbackHandler) => createCase(server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          caseId = results.body.data.id;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          convertToCompleted(caseId, server, cb, "2020-12-07"),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/adjustments`)
            .send(adjustment)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/adjustments`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdAdjustment = results.body[results.body.length - 1];
          const { Amount, ...rest } = adjustment;
          expect(createdAdjustment).toEqual(
            expect.objectContaining({ ...rest, amount: Amount })
          );
          adjustmentId = createdAdjustment.AdjustmentId;
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/adjustments/${adjustmentId}/corrections`
            )
            .send({ CorrectedAmount: 1000, Description: "foo" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/adjustments`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdAdjustment = results.body[results.body.length - 1];
          expect(createdAdjustment.amount).toBe(1000);

          expect(createdAdjustment.corrections.length).toBe(3);

          expect(createdAdjustment.corrections[0].CorrectedAmount).toBe(2000);

          expect(createdAdjustment.corrections[0].Description).toBe(
            "Adjustment Initial"
          );

          expect(createdAdjustment.corrections[1].CorrectedAmount).toBe(-2000);

          expect(createdAdjustment.corrections[1].Description).toBe(
            "Adjustment Cancellation replaced with correction"
          );

          expect(createdAdjustment.corrections[2].CorrectedAmount).toBe(1000);

          expect(createdAdjustment.corrections[2].Description).toBe("foo");
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .delete(`/cases/${caseId}/completed/adjustments/${adjustmentId}`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/adjustments`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdAdjustment = results.body[results.body.length - 1];
          expect(createdAdjustment.amount).toBe(0);

          expect(createdAdjustment.corrections.length).toBe(4);
          expect(createdAdjustment.corrections[3].CorrectedAmount).toBe(-1000);

          expect(createdAdjustment.corrections[3].Description).toBe(
            "Adjustment Cancellation "
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

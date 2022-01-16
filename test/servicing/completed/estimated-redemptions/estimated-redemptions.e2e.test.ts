import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import * as faker from "faker";

import { AppModule } from "../../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../src/models/BaseModel";
import db from "../../../../src/db";
import {
  EstimatedRedemption,
  UpdateEstimatedRedemption,
} from "../../../../src/v2/modules/cases/completed/estimated-redemptions/estimated-redemption.interface";
import { CreateEstimatedRedemptionDto } from "../../../../src/v2/modules/cases/completed/estimated-redemptions/dtos/create-estimated-redemption.dto";
import { createCase, convertToCompleted } from "../utils/shared-requests";

const getEstimatedRedemption = () => ({
  Amount: +faker.finance.amount(),
  Date: faker.date.future().toISOString(),
});

describe("EstimatedRedemption (e2e)", () => {
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

  it("EstimatedRedemption (POST GET PATCH DELETE)", async (done) => {
    const estimatedRedemption: CreateEstimatedRedemptionDto = getEstimatedRedemption();

    const changedEstimatedRedemption: UpdateEstimatedRedemption = getEstimatedRedemption();
    changedEstimatedRedemption.Date = estimatedRedemption.Date;
    let caseId: string;
    const server = app.getHttpServer();

    let id: number;

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
            .post(`/cases/${caseId}/completed/estimatedRedemptions`)
            .send(estimatedRedemption)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/estimatedRedemptions`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdEstimatedRedemption: EstimatedRedemption =
            results.body[results.body.length - 1];
          expect(results.body.length).toBe(1);
          expect(createdEstimatedRedemption).toEqual(
            expect.objectContaining(estimatedRedemption)
          );
          id = createdEstimatedRedemption.EstimatedRedemptionId;
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/cases/${caseId}/completed/estimatedRedemptions/${id}`)
            .send(changedEstimatedRedemption)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/estimatedRedemptions`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdEstimatedRedemption: EstimatedRedemption =
            results.body[results.body.length - 1];
          expect(results.body.length).toBe(1);
          expect(createdEstimatedRedemption).toEqual(
            expect.objectContaining(changedEstimatedRedemption)
          );
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .delete(`/cases/${caseId}/completed/estimatedRedemptions/${id}`)
            .send(changedEstimatedRedemption)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/estimatedRedemptions`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(0);
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

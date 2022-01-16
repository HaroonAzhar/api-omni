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
  ExpectedDrawdown,
  UpdateExpectedDrawdown,
} from "../../../../src/v2/modules/cases/completed/expected-drawdowns/expected-drawdown.interface";
import { CreateExpectedDrawdownDto } from "../../../../src/v2/modules/cases/completed/expected-drawdowns/dtos/create-expected-drawdown.dto";
import { createCase, convertToCompleted } from "../utils/shared-requests";

const getExpectedDrawdown = () => ({
  Amount: +faker.finance.amount(),
  Date: faker.date.future().toISOString(),
});

describe("ExpectedDrawdown (e2e)", () => {
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

  it("ExpectedDrawdown (POST GET PATCH DELETE)", async (done) => {
    const expectedDrawdown: CreateExpectedDrawdownDto = getExpectedDrawdown();

    const changedExpectedDrawdown: UpdateExpectedDrawdown = getExpectedDrawdown();
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
            .post(`/cases/${caseId}/completed/expectedDrawdowns`)
            .send(expectedDrawdown)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/expectedDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdExpectedDrawdown: ExpectedDrawdown =
            results.body[results.body.length - 1];
          expect(results.body.length).toBe(1);
          expect(createdExpectedDrawdown).toEqual(
            expect.objectContaining(expectedDrawdown)
          );
          id = createdExpectedDrawdown.ExpectedDrawdownId;
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/cases/${caseId}/completed/expectedDrawdowns/${id}`)
            .send(changedExpectedDrawdown)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/expectedDrawdowns`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdExpectedDrawdown: ExpectedDrawdown =
            results.body[results.body.length - 1];
          expect(results.body.length).toBe(1);
          expect(createdExpectedDrawdown).toEqual(
            expect.objectContaining(changedExpectedDrawdown)
          );
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .delete(`/cases/${caseId}/completed/expectedDrawdowns/${id}`)
            .send(changedExpectedDrawdown)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/expectedDrawdowns`)
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

import { Test, TestingModule } from "@nestjs/testing";
import { HttpServer, INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../src/models/BaseModel";
import db from "../../src/db";

const createCase = (server: HttpServer, cb: request.CallbackHandler) =>
  request(server)
    .post("/cases")
    .set("Accept", "application/vnd.api+json")
    .set("Content-Type", "application/vnd.api+json")
    .expect(200, cb);

describe("Convert case to completed (e2e)", () => {
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

  it("Convert without waypoints", async (done) => {
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
          request(server)
            .post(`/cases/${caseId}/stage`)
            .send({ Stage: "completed", DateOfCompletion: "2020.12.07" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.completed.DateOfCompletion).toBe(
            "2020-12-07T00:00:00.000Z"
          );
          cb(null, results);
          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });

  it("Convert with waypoints", async (done) => {
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
          request(server)
            .post(`/cases/${caseId}/stage`)
            .send({
              Stage: "completed",
              DateOfCompletion: "2021-01-01",
              AddWaypointForRedemptionDueDate: true,
              AddWaypointForSendStandingOrderInstruction: true,
              AddWaypointForSendStandingOrderInstructionDate: "2021-01-12",
            })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.completed.DateOfCompletion).toBe(
            "2021-01-01T00:00:00.000Z"
          );
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/waypoints`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(2);
          expect(results.body[0]).toEqual(
            expect.objectContaining({
              Name: "Redemption Due Date",
            })
          );
          expect(results.body[1]).toEqual(
            expect.objectContaining({
              Name: "Send Standing Order Instruction",
              DueDate: "2021-01-12T00:00:00.000Z",
            })
          );
          cb(null, results);
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

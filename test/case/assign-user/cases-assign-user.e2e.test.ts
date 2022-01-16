import { Test, TestingModule } from "@nestjs/testing";
import { HttpServer, INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../src/models/BaseModel";
import db from "../../../src//db";

const createCase = (server: HttpServer, cb: request.CallbackHandler) =>
  request(server)
    .post("/cases")
    .set("Accept", "application/vnd.api+json")
    .set("Content-Type", "application/vnd.api+json")
    .expect(200, cb);

describe("Case assign (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    BaseModel.registerKnex(db);
    await db.table("OriginationAdmin.Users").insert({ Name: "bar" });
    connectWithCurrentApp(app);
    await app.init();
  });

  it("Assign user to case (POST GET DELETE)", async (done) => {
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
            .post(`/cases/${caseId}/assignedUser`)
            .send({ UserId: 1 })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { assignedUser } = results.body;
          expect(assignedUser).toEqual(expect.objectContaining({ Id: 1 }));
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .delete(`/cases/${caseId}/assignedUser`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { assignedUser } = results.body;
          expect(assignedUser).toBeUndefined();
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

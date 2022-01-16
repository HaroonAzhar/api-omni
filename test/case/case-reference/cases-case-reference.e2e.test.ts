import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../src/models/BaseModel";
import db from "../../../src/db";
import { createCase } from "../../requests";

describe("Case reference (e2e)", () => {
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

  it("Create Case Reference (POST)", async (done) => {
    let caseId: string;
    const clientName = "Foobar";
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
            .post(`/cases/${caseId}/caseNr`)
            .send({ clientName })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { CaseNr } = results.body;
          expect(CaseNr).toContain("FOOB");
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

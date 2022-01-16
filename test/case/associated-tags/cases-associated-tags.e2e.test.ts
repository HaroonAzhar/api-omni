import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../src/models/BaseModel";
import db from "../../../src/db";
import { createCase } from "../../requests";

describe("Case associate tag (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    BaseModel.registerKnex(db);
    await db.table("OriginationAdmin.Tags").insert({ Name: "bar" });
    connectWithCurrentApp(app);
    await app.init();
  });

  it("Assign tag to case (POST GET DELETE)", async (done) => {
    let caseId: string;
    let tagId: number;
    let associatedTagId: number;
    const server = app.getHttpServer();
    return waterfall(
      [
        (cb: request.CallbackHandler) => createCase(server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          caseId = results.body.data.id;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) => {
          request(server)
            .post(`/tags`)
            .send({ Name: "testTag", ColorCode: "#000000", Id: 1 })
            .expect(201, cb);
        },
        (results: request.Response, cb: request.CallbackHandler) => {
          tagId = parseInt(results.text);
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/associatedTags`)
            .send({ FkTagId: tagId })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/associatedTags`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const associatedTags = results.body;
          expect(associatedTags).toEqual(
            expect.arrayContaining([expect.objectContaining({ Id: tagId })])
          );
          associatedTagId = associatedTags[0].Id;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .delete(`/cases/${caseId}/associatedTags/${associatedTagId}`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { associatedTag } = results.body;
          expect(associatedTag).toBeUndefined();
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

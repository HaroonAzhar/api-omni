import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import { UnderwriterEntity } from "../../../src/v2/modules/admin/underwriters/underwriters.service";

describe("Underwriters (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/underwriters (POST GET PATCH DELETE)", async (done) => {
    let initialLength = 0;
    let underwriter: UnderwriterEntity;
    const Name = "teste2e";
    const newName = "newName";
    const server = app.getHttpServer();
    return waterfall(
      [
        (cb: request.CallbackHandler) =>
          request(server).post("/underwriters").send({ Name }).expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/underwriters").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeGreaterThan(0);
          initialLength = results.body.length;
          underwriter = results.body[initialLength - 1];
          expect(underwriter.Name).toBe(Name);
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/underwriters/${underwriter.Id}`)
            .send({ Name: newName })
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/underwriters").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const underwritersWithMatchingId = results.body.filter(
            (resultUnderwriter: UnderwriterEntity) =>
              resultUnderwriter.Id === underwriter.Id
          );
          expect(underwritersWithMatchingId.length).toBe(1);
          expect(underwritersWithMatchingId[0].Name).toBe(newName);

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .delete(`/underwriters/${underwriter.Id}`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/underwriters").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeLessThan(initialLength);
          const underwritersWithMatchingId = results.body.filter(
            (resultUnderwriter: UnderwriterEntity) =>
              resultUnderwriter.Id === underwriter.Id
          );
          expect(underwritersWithMatchingId.length).toBe(0);

          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get("/underwriters")
            .query({ currentRecordId: underwriter.Id })
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(initialLength);
          const underwritersWithMatchingId = results.body.filter(
            (resultUnderwriter: UnderwriterEntity) =>
              resultUnderwriter.Id === underwriter.Id
          );
          expect(underwritersWithMatchingId.length).toBe(1);

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

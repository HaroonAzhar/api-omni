import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import { OriginatorEntity } from "../../../src/v2/modules/admin/originators/originators.service";

describe("Originators (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/originators (POST GET PATCH DELETE)", async (done) => {
    let initialLength = 0;
    let originator: OriginatorEntity;
    const Name = "teste2e";
    const newName = "newName";
    const server = app.getHttpServer();
    return waterfall(
      [
        (cb: request.CallbackHandler) =>
          request(server).post("/originators").send({ Name }).expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/originators").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeGreaterThan(0);
          initialLength = results.body.length;
          originator = results.body[initialLength - 1];
          expect(originator.Name).toBe(Name);
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/originators/${originator.Id}`)
            .send({ Name: newName })
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/originators").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const originatorsWithMatchingId = results.body.filter(
            (resultOriginator: OriginatorEntity) =>
              resultOriginator.Id === originator.Id
          );
          expect(originatorsWithMatchingId.length).toBe(1);
          expect(originatorsWithMatchingId[0].Name).toBe(newName);

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .delete(`/originators/${originator.Id}`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/originators").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeLessThan(initialLength);
          const originatorsWithMatchingId = results.body.filter(
            (resultOriginator: OriginatorEntity) =>
              resultOriginator.Id === originator.Id
          );
          expect(originatorsWithMatchingId.length).toBe(0);

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

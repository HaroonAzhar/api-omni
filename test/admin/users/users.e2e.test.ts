import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import { UserEntity } from "../../../src/v2/modules/admin/users/users.service";

describe("Users (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/users (POST GET PATCH DELETE)", async (done) => {
    let initialLength = 0;
    let user: UserEntity;
    const Name = "teste2e";
    const UserIdentity = "some identity";
    const newName = "newName";
    const server = app.getHttpServer();
    return waterfall(
      [
        (cb: request.CallbackHandler) =>
          request(server)
            .post("/users")
            .send({ Name, UserIdentity })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/users").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeGreaterThan(0);
          initialLength = results.body.length;
          user = results.body[initialLength - 1];
          expect(user.Name).toBe(Name);
          expect(user.UserIdentity).toBe(UserIdentity);
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/users/${user.Id}`)
            .send({ Name: newName })
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/users").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const usersWithMatchingId = results.body.filter(
            (resultUser: UserEntity) => resultUser.Id === user.Id
          );
          expect(usersWithMatchingId.length).toBe(1);
          expect(usersWithMatchingId[0].Name).toBe(newName);
          expect(usersWithMatchingId[0].UserIdentity).toBe(UserIdentity);

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).delete(`/users/${user.Id}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/users").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeLessThan(initialLength);
          const usersWithMatchingId = results.body.filter(
            (resultUser: UserEntity) => resultUser.Id === user.Id
          );
          expect(usersWithMatchingId.length).toBe(0);

          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get("/users")
            .query({ currentRecordId: user.Id })
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(initialLength);
          const usersWithMatchingId = results.body.filter(
            (resultUser: UserEntity) => resultUser.Id === user.Id
          );
          expect(usersWithMatchingId.length).toBe(1);

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

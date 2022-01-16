import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import { WaypointNameEntity } from "../../../src/v2/modules/admin/waypoint-names/waypoint-name.service";

describe("WaypointNames (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/waypointNames (POST GET PATCH DELETE)", async (done) => {
    let initialLength = 0;
    let waypointName: WaypointNameEntity;
    const Name = "teste2e";
    const newName = "newName";
    const server = app.getHttpServer();
    return waterfall(
      [
        (cb: request.CallbackHandler) =>
          request(server).post("/waypointNames").send({ Name }).expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/waypointNames").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeGreaterThan(0);
          initialLength = results.body.length;
          waypointName = results.body[initialLength - 1];
          expect(waypointName.Name).toBe(Name);
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/waypointNames/${waypointName.Id}`)
            .send({ Name: newName })
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/waypointNames").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const waypointNamesWithMatchingId = results.body.filter(
            (resultWaypointName: WaypointNameEntity) =>
              resultWaypointName.Id === waypointName.Id
          );
          expect(waypointNamesWithMatchingId.length).toBe(1);
          expect(waypointNamesWithMatchingId[0].Name).toBe(newName);

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .delete(`/waypointNames/${waypointName.Id}`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/waypointNames").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeLessThan(initialLength);
          const waypointNamesWithMatchingId = results.body.filter(
            (resultWaypointName: WaypointNameEntity) =>
              resultWaypointName.Id === waypointName.Id
          );
          expect(waypointNamesWithMatchingId.length).toBe(0);

          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get("/waypointNames")
            .query({ currentRecordId: waypointName.Id })
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(initialLength);
          const waypointNamesWithMatchingId = results.body.filter(
            (resultWaypointName: WaypointNameEntity) =>
              resultWaypointName.Id === waypointName.Id
          );
          expect(waypointNamesWithMatchingId.length).toBe(1);

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

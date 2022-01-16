import { Test, TestingModule } from "@nestjs/testing";
import { HttpServer, INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../src/models/BaseModel";
import db from "../../../../src//db";
import { getMinimalWaypoint, getSampleWaypoint } from "./waypoints-test-utils";

const createCase = (server: HttpServer, cb: request.CallbackHandler) =>
  request(server)
    .post("/cases")
    .set("Accept", "application/vnd.api+json")
    .set("Content-Type", "application/vnd.api+json")
    .expect(200, cb);

describe("Waypoint (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    BaseModel.registerKnex(db);
    await db.table("OriginationAdmin.Originators").insert({ Name: "bar" });
    connectWithCurrentApp(app);
    await app.init();
  });

  it("minimal Waypoint (POST GET)", async (done) => {
    const waypoint = getMinimalWaypoint("2020-12-07T00:00:00.000Z");
    const waypointDto = {
      ...waypoint,
      RecurringEvent: "not_recurring",
    };
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
          request(server)
            .post(`/cases/${caseId}/completed/waypoints`)
            .send(waypointDto)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/waypoints`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdWaypoint = results.body[results.body.length - 1];
          expect(createdWaypoint).toEqual(expect.objectContaining(waypoint));
          cb(null, results);
          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });

  it("full Waypoint (POST GET change IsCompleted PATCH DELETE filter)", async (done) => {
    const waypoint = getSampleWaypoint("2020-12-07T00:00:00.000Z");
    const waypointDto = {
      ...waypoint,
      RecurringEvent: "not_recurring",
    };
    const newWaypoint = getSampleWaypoint("2020-12-06T00:00:00.000Z");
    let caseId: string;
    let waypointId: number;
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
          request(server)
            .post(`/cases/${caseId}/completed/waypoints`)
            .send(waypointDto)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/waypoints`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdWaypoint = results.body[results.body.length - 1];
          expect(createdWaypoint).toEqual(expect.objectContaining(waypoint));
          waypointId = createdWaypoint.WaypointId;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(
              `/cases/${caseId}/completed/waypoints?IsCompleted=${!waypoint.IsCompleted}`
            )
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(0);
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/cases/${caseId}/completed/waypoints/${waypointId}`)
            .send(newWaypoint)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/waypoints`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const modifiedWaypoint = results.body[results.body.length - 1];
          expect(modifiedWaypoint).toEqual(
            expect.objectContaining({
              ...modifiedWaypoint,
              WaypointId: waypointId,
            })
          );
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .delete(`/cases/${caseId}/completed/waypoints/${waypointId}`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/waypoints`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(0);
          cb(null, results);
          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });

  it("recurring Waypoint (POST GET)", async (done) => {
    const waypoint = getSampleWaypoint("2020-12-07T00:00:00.000Z");
    const NumberOfTimesToRepeat = 5;
    const waypointDto = {
      ...waypoint,
      RecurringEvent: "weekly",
      NumberOfTimesToRepeat,
    };
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
          request(server)
            .post(`/cases/${caseId}/completed/waypoints`)
            .send(waypointDto)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/waypoints`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(NumberOfTimesToRepeat);
          const createdWaypoint = results.body[0];
          expect(createdWaypoint).toEqual(expect.objectContaining(waypoint));
          cb(null, results);
          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });

  it("other Waypoint (POST GET)", async (done) => {
    const waypoint = getSampleWaypoint("2020-12-07T00:00:00.000Z");
    const Name = "Other";
    const OtherWaypointDescription = "sample description";
    const waypointDtoWithDescription = {
      ...waypoint,
      RecurringEvent: "not_recurring",
      Name,
      OtherWaypointDescription,
    };
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
          request(server)
            .post(`/cases/${caseId}/completed/waypoints`)
            .send(waypointDtoWithDescription)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/waypoints`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(1);
          const createdWaypoint = results.body[0];
          expect(createdWaypoint).toEqual(
            expect.objectContaining({
              ...waypoint,
              Name,
              OtherWaypointDescription,
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

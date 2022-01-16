import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import faker from "faker";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import { CreateEnquiry } from "../../../src/v2/modules/cases/enquiry/enquiry.interface";
import connectWithCurrentApp from "../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../src/models/BaseModel";
import db from "../../../src//db";
import { createCase, getDip } from "../../requests";
import { getRandomEnquiry } from "./enquiry.test.helpers";

describe("Enquiry (e2e)", () => {
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

  it("Saves all enquiry fields(POST GET)", async (done) => {
    const enquiry: CreateEnquiry = getRandomEnquiry();
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
            .post(`/cases/${caseId}/enquiry`)
            .send(enquiry)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}/enquiry`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdEnquiry = results.body;
          expect(createdEnquiry).toEqual(expect.objectContaining(enquiry));
          cb(null, results);
          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });

  it("Updates all enquiry fields(POST GET)", async (done) => {
    const enquiry: CreateEnquiry = getRandomEnquiry();
    const otherEnquiry: CreateEnquiry = getRandomEnquiry();

    let caseId: string;
    const server = app.getHttpServer();
    const Status = faker.random.arrayElement([
      "not_proceeding",
      "received",
      "on_hold",
    ]);
    return waterfall(
      [
        (cb: request.CallbackHandler) => createCase(server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          caseId = results.body.data.id;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/enquiry`)
            .send(enquiry)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}/enquiry`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdEnquiry = results.body;
          expect(createdEnquiry).toEqual(expect.objectContaining(enquiry));
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/enquiry`)
            .send(otherEnquiry)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}/enquiry`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdEnquiry = results.body;
          expect(createdEnquiry).toEqual(expect.objectContaining(otherEnquiry));
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/status`)
            .send({ Status })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}/enquiry`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdEnquiry = results.body;
          expect(createdEnquiry.Status).toBe(Status);
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

  it("converts enquiry into dip", async (done) => {
    const enquiry: CreateEnquiry = getRandomEnquiry();
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
            .post(`/cases/${caseId}/enquiry`)
            .send(enquiry)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}/enquiry`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdEnquiry = results.body;
          expect(createdEnquiry).toEqual(expect.objectContaining(enquiry));
          expect(createdEnquiry.CaseNr).toEqual(
            expect.stringMatching(/ENQ-\d\d\d\d\d\d/)
          );
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/stage`)
            .send({ Stage: "dip" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.case_nr).toBe(null);

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

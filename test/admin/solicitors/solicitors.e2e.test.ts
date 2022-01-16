import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import faker from "faker";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import { SolicitorEntity } from "../../../src/v2/modules/admin/solicitors/solicitors.service";
import { Address } from "../../../src/v2/modules/address/address.interface";
import { Solicitor } from "../../../src/v2/modules/admin/solicitors/solicitor.interface";

describe("Solicitors (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("/solicitors (POST) requires non empty address", async (done) => {
    const server = app.getHttpServer();

    request(server)
      .post("/solicitors")
      .send({ Name: faker.random.word(), Address: {} })
      .expect(400, done);
  });

  it("/solicitors/undefined (GET) returns bad request", async (done) => {
    const server = app.getHttpServer();

    request(server).get("/solicitors/undefined").expect(400, done);
  });

  it("/solicitors/random (GET) returns not found", async (done) => {
    const server = app.getHttpServer();

    request(server)
      .get(`/solicitors/${faker.random.number({ min: 10000, max: 20000 })}`)
      .expect(404, done);
  });

  it("/solicitors (POST GET PATCH DELETE)", async (done) => {
    let initialLength = 0;
    let solicitor: Solicitor;
    const name = faker.random.word();
    const address: Address = {
      Line1: faker.address.streetAddress(),
      Line2: faker.address.streetName(),
      TownCity: faker.address.city(),
      Country: faker.address.country(),
      Postcode: faker.address.zipCode(),
    };
    const newName = faker.random.word();
    const newAddress: Address = {
      Line1: faker.address.streetAddress(),
      TownCity: faker.address.city(),
      Country: faker.address.country(),
      Postcode: faker.address.zipCode(),
    };
    const server = app.getHttpServer();
    return waterfall(
      [
        (cb: request.CallbackHandler) =>
          request(server)
            .post("/solicitors")
            .send({ Name: name, Address: address })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/solicitors").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeGreaterThan(0);
          initialLength = results.body.length;
          solicitor = results.body[initialLength - 1];
          expect(solicitor.Name).toBe(name);
          expect(solicitor.Address).toEqual(expect.objectContaining(address));

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/solicitors/${solicitor.Id}`)
            .send({ Name: newName })
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/solicitors/${solicitor.Id}`)
            .send({ Address: newAddress })
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/solicitors/${solicitor.Id}`)
            .send({ Name: newName, Address: newAddress })
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/solicitors").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const solicitorsWithMatchingId = results.body.filter(
            (resultSolicitor: SolicitorEntity) =>
              resultSolicitor.Id === solicitor.Id
          );
          expect(solicitorsWithMatchingId.length).toBe(1);
          expect(solicitorsWithMatchingId[0].Name).toBe(newName);
          expect(solicitorsWithMatchingId[0].Address).toEqual(
            expect.objectContaining(newAddress)
          );
          expect(solicitorsWithMatchingId[0].Address.Line2).toEqual("");

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).delete(`/solicitors/${solicitor.Id}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/solicitors").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeLessThan(initialLength);
          const solicitorsWithMatchingId = results.body.filter(
            (resultSolicitor: SolicitorEntity) =>
              resultSolicitor.Id === solicitor.Id
          );
          expect(solicitorsWithMatchingId.length).toBe(0);

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

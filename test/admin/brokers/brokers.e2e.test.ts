import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import faker from "faker";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import {
  Broker,
  BrokerEntity,
} from "../../../src/v2/modules/admin/brokers/broker.interface";
import { CreateBrokerDto } from "../../../src/v2/modules/admin/brokers/controller/dto/create-broker.dto";
import { CreateBrokerIndividualDto } from "../../../src/v2/modules/admin/brokers/controller/dto/create-broker-individual.dto";
import { UpdateBrokerDto } from "../../../src/v2/modules/admin/brokers/controller/dto/update-broker.dto";

const getIndividualBroker = (): CreateBrokerIndividualDto => ({
  ContactEmail: faker.internet.email(),
  ContactName: faker.name.findName(),
});
const getBrokerIndividuals = (): CreateBrokerIndividualDto[] =>
  Array.from({
    length: faker.random.number({ min: 0, max: 20 }),
  }).map(getIndividualBroker);

const compareBrokerIndividuals = (
  savedBroker: Broker,
  updateBroker: UpdateBrokerDto
) => {
  expect(savedBroker.individualBrokers.length).toBe(
    updateBroker.individualBrokers.length
  );

  savedBroker.individualBrokers.forEach((savedBrokerIndividual) => {
    const matchingSend = updateBroker.individualBrokers.find(
      (sendBroker) =>
        sendBroker.ContactName === savedBrokerIndividual.ContactName
    );
    expect(savedBrokerIndividual).toEqual(
      expect.objectContaining(matchingSend)
    );
  });
};

describe("Brokers (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("/brokers/undefined (GET) returns bad request", async (done) => {
    const server = app.getHttpServer();

    request(server).get("/brokers/undefined").expect(400, done);
  });

  it("/brokers/random (GET) returns not found", async (done) => {
    const server = app.getHttpServer();

    request(server)
      .get(`/brokers/${faker.random.number({ min: 10000, max: 20000 })}`)
      .expect(404, done);
  });

  it("/brokers (POST GET minimal)", async (done) => {
    const createBroker: CreateBrokerDto = {
      individualBrokers: [],
      CompanyName: faker.company.companyName(),
      isApproved: faker.random.boolean(),
    };

    const server = app.getHttpServer();

    return waterfall(
      [
        (cb: request.CallbackHandler) =>
          request(server).post("/brokers").send(createBroker).expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/brokers").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeGreaterThan(0);
          const broker: Broker = results.body[results.body.length - 1];
          expect(broker.CompanyName).toBe(createBroker.CompanyName);
          expect(broker.isApproved).toBe(createBroker.isApproved);

          expect(broker.individualBrokers.length).toBe(0);

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

  it("/brokers (Patch individuals)", async (done) => {
    const createBroker: CreateBrokerDto = {
      individualBrokers: [
        getIndividualBroker(),
        getIndividualBroker(),
        getIndividualBroker(),
      ],
      CompanyName: faker.company.companyName(),
      isApproved: faker.random.boolean(),
    };

    const server = app.getHttpServer();

    let updateIndividualsSpecific: UpdateBrokerDto;
    let brokerId: number;
    return waterfall(
      [
        (cb: request.CallbackHandler) =>
          request(server).post("/brokers").send(createBroker).expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/brokers").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeGreaterThan(0);
          const broker: Broker = results.body[results.body.length - 1];

          expect(broker.individualBrokers.length).toBe(3);

          brokerId = broker.Id;

          updateIndividualsSpecific = {
            individualBrokers: [
              {
                ...broker.individualBrokers[1],
              },
              {
                ...broker.individualBrokers[0],
                ContactEmail: faker.internet.email(),
              },
              getIndividualBroker(),
            ],
          };

          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/brokers/${brokerId}`)
            .send(updateIndividualsSpecific)
            .expect(200, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/brokers/${brokerId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const broker: Broker = results.body;

          compareBrokerIndividuals(broker, updateIndividualsSpecific);
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

  it("/brokers (POST GET PATCH DELETE)", async (done) => {
    const brokerIndividuals = getBrokerIndividuals();

    const createBroker: CreateBrokerDto = {
      individualBrokers: brokerIndividuals,
      CompanyName: faker.company.companyName(),
      isApproved: faker.random.boolean(),
    };

    const server = app.getHttpServer();

    const updateName: UpdateBrokerDto = {
      CompanyName: faker.company.companyName(),
    };

    const updateApproved: UpdateBrokerDto = {
      isApproved: !createBroker.isApproved,
    };

    const updateIndividuals: UpdateBrokerDto = {
      individualBrokers: getBrokerIndividuals(),
    };

    const updateFull: UpdateBrokerDto = {
      CompanyName: faker.company.companyName(),
      isApproved: faker.random.boolean(),
      individualBrokers: getBrokerIndividuals(),
    };

    let brokerId: number;
    return waterfall(
      [
        (cb: request.CallbackHandler) =>
          request(server).post("/brokers").send(createBroker).expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/brokers").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeGreaterThan(0);
          const broker: Broker = results.body[results.body.length - 1];
          expect(broker.CompanyName).toBe(createBroker.CompanyName);
          expect(broker.isApproved).toBe(createBroker.isApproved);

          compareBrokerIndividuals(broker, createBroker);
          brokerId = ((broker as unknown) as BrokerEntity).Id;

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/brokers/${brokerId}`)
            .send(updateName)
            .expect(200, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/brokers/${brokerId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const broker: Broker = results.body;
          expect(broker.CompanyName).toBe(updateName.CompanyName);
          expect(broker.isApproved).toBe(createBroker.isApproved);

          compareBrokerIndividuals(broker, createBroker);

          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/brokers/${brokerId}`)
            .send(updateApproved)
            .expect(200, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/brokers/${brokerId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const broker: Broker = results.body;
          expect(broker.CompanyName).toBe(updateName.CompanyName);
          expect(broker.isApproved).toBe(updateApproved.isApproved);

          compareBrokerIndividuals(broker, createBroker);

          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/brokers/${brokerId}`)
            .send(updateIndividuals)
            .expect(200, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/brokers/${brokerId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const broker: Broker = results.body;
          expect(broker.CompanyName).toBe(updateName.CompanyName);
          expect(broker.isApproved).toBe(updateApproved.isApproved);

          compareBrokerIndividuals(broker, updateIndividuals);

          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/brokers/${brokerId}`)
            .send(updateFull)
            .expect(200, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/brokers/${brokerId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const broker: Broker = results.body;
          expect(broker.CompanyName).toBe(updateFull.CompanyName);
          expect(broker.isApproved).toBe(updateFull.isApproved);

          compareBrokerIndividuals(broker, updateFull);

          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).delete(`/brokers/${brokerId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/brokers").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const brokersWithMatchingId = results.body.filter(
            (resultBroker: BrokerEntity) => resultBroker.Id === brokerId
          );
          expect(brokersWithMatchingId.length).toBe(0);

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

import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import faker from "faker";
import moment from "moment";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import {
  Contact,
  ContactEntity,
} from "../../../src/v2/modules/admin/contacts/contact.interface";
import { CreateContactDto } from "../../../src/v2/modules/admin/contacts/controller/dto/create-contact.dto";
import { UpdateContactDto } from "../../../src/v2/modules/admin/contacts/controller/dto/update-contact.dto";

describe("Contacts (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("/contacts/undefined (GET) returns bad request", async (done) => {
    const server = app.getHttpServer();

    request(server).get("/contacts/undefined").expect(400, done);
  });

  it("/contacts (POST GET minimal)", async (done) => {
    const createContact: CreateContactDto = {
      Forename: faker.name.firstName(),
      Surname: faker.name.lastName(),
    };

    const server = app.getHttpServer();

    return waterfall(
      [
        (cb: request.CallbackHandler) =>
          request(server).post("/contacts").send(createContact).expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/contacts").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeGreaterThan(0);
          const contact: Contact = results.body[results.body.length - 1];
          expect(contact).toEqual(expect.objectContaining(createContact));

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

  it("/contacts (POST GET PATCH DELETE)", async (done) => {
    const createContact: CreateContactDto = {
      Forename: faker.name.firstName(),
      Surname: faker.name.lastName(),
      MiddleName: faker.name.findName(),
      DateOfBirth: moment(faker.date.past()).utc(false).startOf("day").format(),
      NationalInsuranceNumber: faker.random.alphaNumeric(10),
    };

    const server = app.getHttpServer();

    const updateName: UpdateContactDto = {
      MiddleName: faker.name.findName(),
    };

    const updateFull: UpdateContactDto = {
      Forename: faker.name.firstName(),
      Surname: faker.name.lastName(),
      MiddleName: faker.name.findName(),
      DateOfBirth: moment(faker.date.past()).utc(false).startOf("day").format(),
      NationalInsuranceNumber: faker.random.alphaNumeric(10),
    };

    let contactId: number;
    return waterfall(
      [
        (cb: request.CallbackHandler) =>
          request(server).post("/contacts").send(createContact).expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/contacts").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeGreaterThan(0);
          const contact: Contact = results.body[results.body.length - 1];
          const { DateOfBirth, ...rest } = contact;
          const { DateOfBirth: createDate, ...restCreate } = createContact;
          expect(rest).toEqual(expect.objectContaining(restCreate));

          expect(moment(DateOfBirth).format()).toEqual(
            moment(createDate).format()
          );
          contactId = ((contact as unknown) as ContactEntity).Id;

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/contacts/${contactId}`)
            .send(updateName)
            .expect(200, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/contacts/${contactId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const contact: Contact = results.body;
          expect(contact.MiddleName).toBe(updateName.MiddleName);
          expect(contact.Forename).toBe(createContact.Forename);

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/contacts/${contactId}`)
            .send(updateFull)
            .expect(200, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/contacts/${contactId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const contact: Contact = results.body;
          const { DateOfBirth, ...rest } = contact;
          const { DateOfBirth: updateDate, ...restUpdate } = updateFull;
          expect(rest).toEqual(expect.objectContaining(restUpdate));

          expect(moment(DateOfBirth).format()).toEqual(
            moment(updateDate).format()
          );
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).delete(`/contacts/${contactId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/contacts").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const contactsWithMatchingId = results.body.filter(
            (resultContact: ContactEntity) => resultContact.Id === contactId
          );
          expect(contactsWithMatchingId.length).toBe(0);

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

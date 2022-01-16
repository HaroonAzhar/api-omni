import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../src/models/BaseModel";
import db from "../../../../src/db";
import {
  convertToCompleted,
  createCase,
  addProperties,
  convertToDip,
  convertToApplication,
  addValuationReport,
} from "../utils/shared-requests";
import { CreateSecurityReleaseDto } from "../../../../src/v2/modules/cases/completed/securities/security-releases/dtos/create-security-release.dto";
import { CreateSecurityValuationDto } from "../../../../src/v2/modules/cases/completed/securities/security-valuations/dtos/create-security-valuation.dto";
import { valuationTypes } from "../../../../src/v2/modules/cases/completed/securities/security-valuations/security-valuations.interface";
import { getApplication } from "../../../requests";
import { Security } from "../../../../src/v2/modules/cases/completed/securities/security.interface";
import { CreateSecurityConversionDto } from "../../../../src/v2/modules/cases/completed/securities/security-conversions/dtos/create-security-conversion.dto";
import { CreateNewSecurityDto } from "../../../../src/v2/modules/cases/completed/securities/dtos/create-new-security.dto";

describe("Security (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    BaseModel.registerKnex(db);
    connectWithCurrentApp(app);
    await app.init();
  });

  const valuation: CreateSecurityValuationDto = {
    Valuer: "valuer",
    ValuationDate: "2021-04-01T00:00:00.000Z",
    ReportDate: "2021-04-02T00:00:00.000Z",
    RecipientName: "recipient",
    ValuationType: valuationTypes[0],

    Notes: "notes",

    Valuation: 1234.45,
    GDV: 23.45,
  };

  it("Security (GET add Note)", async (done) => {
    let caseId: string;
    let securityId: number;
    let propertyId: number;
    let otherPropertyId: number;
    let otherSecurityId: number;
    const server = app.getHttpServer();

    const release: CreateSecurityReleaseDto = {
      DisposalToConnectedParty: true,
      SalePrice: 123.45,
      SaleType: "Auction",
      Notes: "bar",
    };

    const conversion: CreateSecurityConversionDto = {
      Notes: "conversion Notes",
    };

    type Results = {
      body: Security[];
    };
    const getSecurityUnderTest = (results: Results) => {
      const [security] = results.body.filter(
        ({ property }) => property.CasePropertyId === propertyId
      );
      return security;
    };
    const getOtherSecurity = (results: Results) => {
      const [security] = results.body.filter(
        ({ property }) => property.CasePropertyId === otherPropertyId
      );
      return security;
    };
    return waterfall(
      [
        (cb: request.CallbackHandler) => createCase(server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          caseId = results.body.data.id;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          convertToDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          convertToApplication(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          addProperties(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          getApplication(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { application } = results.body.data.attributes;
          const { properties } = application;
          const [property, secondProperty] = properties;
          propertyId = property.id;
          otherPropertyId = secondProperty.id;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          addValuationReport(caseId, propertyId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          convertToCompleted(caseId, server, cb, "2020-12-07"),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/securities`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toEqual(10);
          const security = getSecurityUnderTest(results);
          securityId = security.SecurityId;
          expect(security.valuations.length).toBe(1);
          expect(security.currentValuation).toBeGreaterThan(0);
          expect(security.currentGDV).toBeGreaterThan(0);
          expect(security.notes.length).toBe(0);
          expect(security.releases.length).toBe(0);
          expect(security.conversions.length).toBe(0);

          const otherSecurity = getOtherSecurity(results);
          otherSecurityId = otherSecurity.SecurityId;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/securities/${securityId}/notes`)
            .send({ Text: "foo" })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/securities`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const security = getSecurityUnderTest(results);
          expect(security.notes.length).toBe(1);
          expect(security.notes[0]).toEqual(
            expect.objectContaining({ Text: "foo" })
          );
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/securities/${securityId}/valuations`
            )
            .send(valuation)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/securities`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const security = getSecurityUnderTest(results);
          const secondSecurity = getOtherSecurity(results);
          expect(security.valuations.length).toBe(2);
          expect(security.valuations[1]).toEqual(
            expect.objectContaining(valuation)
          );
          expect(security.currentGDV).toBe(valuation.GDV);
          expect(security.currentValuation).toBe(valuation.Valuation);

          expect(secondSecurity.currentGDV).toBe(0);

          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/securities/${securityId}/releases`
            )
            .send(release)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/securities`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const security = getSecurityUnderTest(results);
          const secondSecurity = getOtherSecurity(results);

          expect(security.releases.length).toBe(1);
          expect(security.releases[0]).toEqual(
            expect.objectContaining(release)
          );
          expect(security.isReleased).toBe(true);
          expect(secondSecurity.isReleased).toBe(false);

          expect(security.currentGDV).toBeUndefined();
          expect(security.currentValuation).toBeUndefined();
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(
              `/cases/${caseId}/completed/securities/${otherSecurityId}/conversions`
            )
            .send(conversion)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/securities`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const security = getSecurityUnderTest(results);
          const secondSecurity = getOtherSecurity(results);

          expect(secondSecurity.conversions.length).toBe(1);
          expect(secondSecurity.conversions[0]).toEqual(
            expect.objectContaining(conversion)
          );
          expect(secondSecurity.isConverted).toBe(true);
          expect(secondSecurity.currentGDV).toBeUndefined();
          expect(secondSecurity.currentValuation).toBeUndefined();

          expect(security.isConverted).toBe(false);

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

  it("Security (POST)", async (done) => {
    let caseId: string;
    const server = app.getHttpServer();

    const createSecurity: CreateNewSecurityDto = {
      valuation: {
        ...valuation,
        CreatedBy: "bar",
      },
      note: {
        Text: "Creation Note",
        CreatedBy: "foo",
      },
      property: {
        AddressLine1: "AddressLine1",
        AddressLine2: "AddressLine2",
        AddressCity: "AddressCity",
        AddressCountry: "AddressCountry",
        AddressPostcode: "AddressPostcode",
      },
    };
    return waterfall(
      [
        (cb: request.CallbackHandler) => createCase(server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          caseId = results.body.data.id;
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          convertToCompleted(caseId, server, cb, "2020-12-07"),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/securities`)
            .send(createSecurity)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/securities`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toEqual(1);
          const [security] = (results.body as unknown) as Security[];
          expect(security.valuations.length).toBe(1);
          expect(security.currentValuation).toBeGreaterThan(0);
          expect(security.currentGDV).toBeGreaterThan(0);
          expect(security.notes.length).toBe(1);
          expect(security.notes[0]).toEqual(
            expect.objectContaining({ Text: "Creation Note" })
          );

          expect(security.property).toEqual(
            expect.objectContaining({
              AddressLine1: "AddressLine1",
              AddressLine2: "AddressLine2",
              AddressCity: "AddressCity",
              AddressCountry: "AddressCountry",
              AddressPostcode: "AddressPostcode",
            })
          );

          expect(security.valuations[0]).toEqual(
            expect.objectContaining(valuation)
          );
          expect(security.releases.length).toBe(0);
          expect(security.conversions.length).toBe(0);
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

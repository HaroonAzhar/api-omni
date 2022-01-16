import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import faker from "faker";
import { underscore } from "inflected";
import moment from "moment";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../src/models/BaseModel";
import db from "../../../src//db";
import { createCase, getDip } from "../../requests";
import { ChangeContactIndividualDto } from "../../../src/v2/modules/cases/dip/dtos/change-contact-individual.dto";
import { ChangeContactCompanyDto } from "../../../src/v2/modules/cases/dip/dtos/change-contact-company.dto";
import { ChangeSecuritiesDto } from "../../../src/v2/modules/cases/dip/dtos/change-securities.dto";
import { ChangeBuildingTypeDto } from "../../../src/v2/modules/cases/dip/dtos/change-building-type.dto";
import { generateSecurityContent } from "./helpers/generate-security-content";
import { ChangeLoanDetailsDto } from "../../../src/v2/modules/cases/dip/dtos/change-loan-details.dto";
import { loanTypes } from "../../../src/v2/modules/cases/types/loan-type/loan-type.interface";
import {
  ChangeIntroducerCommandContent,
  DipDrawdown,
  DIP_SUMMARY,
  FINANCIAL_DETAILS,
  loanPurposes,
} from "../../../src/v2/modules/cases/dip/dip.interface";
import { ChangeFinancialCalculatorDetailsDto } from "../../../src/v2/modules/cases/dip/dtos/change-financial-calculator-details.dto";
import { generateFinancialCalculatorDetails } from "./helpers/generate-financial-calculator-details-content";
import { generateFinancialDetails } from "./helpers/generate-financial-details-content";
import { CreateContactDto } from "../../../src/v2/modules/admin/contacts/controller/dto/create-contact.dto";
import { Contact } from "../../../src/v2/modules/admin/contacts/contact.interface";

describe("Dip (e2e)", () => {
  let app: INestApplication;

  let FkBrokerCompanyId: number;
  let FkBrokerIndividualId: number;

  let otherFkBrokerCompanyId: number;
  let otherFkBrokerIndividualId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    BaseModel.registerKnex(db);
    await db.table("OriginationAdmin.Originators").insert({ Name: "bar" });
    [FkBrokerCompanyId] = await db
      .table("OriginationAdmin.Brokers")
      .insert({ CompanyName: "brokerCompanyName" }, "Id");

    [FkBrokerIndividualId] = await db
      .table("OriginationAdmin.BrokerIndividuals")
      .insert(
        {
          ContactName: "brokerContactName",
          ContactEmail: "brokerContactEmail",
          FkBrokerId: FkBrokerCompanyId,
        },
        "Id"
      );

    [otherFkBrokerCompanyId] = await db
      .table("OriginationAdmin.Brokers")
      .insert({ CompanyName: "obrokerCompanyName" }, "Id");

    [otherFkBrokerIndividualId] = await db
      .table("OriginationAdmin.BrokerIndividuals")
      .insert(
        {
          ContactName: "obrokerContactName",
          ContactEmail: "obrokerContactEmail",
          FkBrokerId: otherFkBrokerCompanyId,
        },
        "Id"
      );

    connectWithCurrentApp(app);
    await app.init();
  });

  it("minimal Dip (POST GET)", async (done) => {
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
            .send({ Stage: "dip" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          cb(null, results);
          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });

  it("Dip save and change introducer", async (done) => {
    let caseId: string;
    const server = app.getHttpServer();

    const brokerDetails: ChangeIntroducerCommandContent = {
      IntroducerType: "via_broker",
      FkOriginatorId: 1,
      FkBrokerCompanyId,
      FkBrokerIndividualId,
    };
    const otherBrokerDetails = {
      IntroducerType: "via_broker",
      FkOriginatorId: 1,
      FkBrokerCompanyId: otherFkBrokerCompanyId,
      FkBrokerIndividualId: otherFkBrokerIndividualId,
    };
    const nonBrokerDetails: ChangeIntroducerCommandContent = {
      IntroducerType: "direct_application",
      FkOriginatorId: 1,
    };
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
            .send({ Stage: "dip" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.originator).toBeNull();
          expect(dip.type_of_introducer).toBeNull();
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/introducer`)
            .send(brokerDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.originator).toBe(1);
          expect(dip.type_of_introducer).toBe("via_broker");
          expect(dip.broker_name).toBe("brokerContactName");
          expect(dip.broker_company_name).toBe("brokerCompanyName");
          expect(dip.broker_email).toBe("brokerContactEmail");
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/introducer`)
            .send(otherBrokerDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.broker_name).toBe("obrokerContactName");
          expect(dip.broker_company_name).toBe("obrokerCompanyName");
          expect(dip.broker_email).toBe("obrokerContactEmail");

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/introducer`)
            .send(nonBrokerDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.originator).toBe(1);
          expect(dip.type_of_introducer).toBe("direct_application");

          expect(dip.broker_name).toBeNull();
          expect(dip.broker_company_name).toBeNull();
          expect(dip.broker_email).toBeNull();
          cb(null, results);
          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });

  it("Dip save and change advance type", async (done) => {
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
            .send({ Stage: "dip" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/advance_type`)
            .send({ AdvanceType: "multiple" })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.loan_advance_type).toBe("multiple");
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/advance_type`)
            .send({ AdvanceType: "single" })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.loan_advance_type).toBe("single");
          cb(null, results);

          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });

  it("Dip save and change contact", async (done) => {
    let caseId: string;
    const server = app.getHttpServer();
    const companyDetails: ChangeContactCompanyDto = {
      ContactType: "company",
      CompanyName: faker.company.companyName(),
      CompanyNumber: faker.random.word(),
      CompanyEmail: faker.internet.email(),
    };

    const otherCompanyDetails: ChangeContactCompanyDto = {
      ContactType: "company",
      CompanyName: faker.company.companyName(),
      CompanyNumber: faker.random.word(),
      CompanyEmail: faker.internet.email(),
    };

    let individualsDetails: ChangeContactIndividualDto;

    let otherIndividualsDetails: ChangeContactIndividualDto;

    const createContact: CreateContactDto = {
      Forename: faker.name.firstName(),
      Surname: faker.name.lastName(),
    };

    const createOtherContact: CreateContactDto = {
      Forename: faker.name.firstName(),
      Surname: faker.name.lastName(),
    };
    return waterfall(
      [
        (cb: request.CallbackHandler) => createCase(server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          caseId = results.body.data.id;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).post("/contacts").send(createContact).expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post("/contacts")
            .send(createOtherContact)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/contacts").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeGreaterThan(0);

          const contacts: Contact[] = results.body;
          individualsDetails = {
            ContactType: "individual",
            contacts: Array.from({
              length: faker.random.number({
                min: 1,
                max: results.body.length / 2,
              }),
            }).map((_, index) => ({
              Email: faker.internet.email(),
              FkSharedContactId: contacts[index].Id,
            })),
          };

          otherIndividualsDetails = {
            ContactType: "individual",
            contacts: Array.from({
              length: faker.random.number({ min: 1, max: results.body.length }),
            }).map((_, index) => ({
              Email: faker.internet.email(),
              FkSharedContactId:
                contacts[(index + 10) % results.body.length].Id,
            })),
          };

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/stage`)
            .send({ Stage: "dip" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/contact_company`)
            .send(companyDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body;
          expect(dip.CompanyName).toBe(companyDetails.CompanyName);
          expect(dip.CompanyEmail).toBe(companyDetails.CompanyEmail);
          expect(dip.CompanyNumber).toBe(companyDetails.CompanyNumber);

          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/contact_company`)
            .send(otherCompanyDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body;
          expect(dip.CompanyName).toBe(otherCompanyDetails.CompanyName);
          expect(dip.CompanyEmail).toBe(otherCompanyDetails.CompanyEmail);
          expect(dip.CompanyNumber).toBe(otherCompanyDetails.CompanyNumber);
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/contact_individual`)
            .send(individualsDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body;

          expect(dip.contacts.length).toBe(individualsDetails.contacts.length);
          dip.contacts.forEach(
            (
              applicant: { FkSharedContactId: number; email: string },
              index: number
            ) => {
              const sendApplicant = individualsDetails.contacts[index];
              expect(applicant.FkSharedContactId).toBe(
                sendApplicant.FkSharedContactId
              );
              expect(applicant.email).toBe(sendApplicant.Email);
            }
          );
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/contact_individual`)
            .send(otherIndividualsDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body;

          expect(dip.contacts.length).toBe(
            otherIndividualsDetails.contacts.length
          );
          dip.contacts.forEach(
            (
              applicant: { FkSharedContactId: number; email: string },
              index: number
            ) => {
              const sendApplicant = otherIndividualsDetails.contacts[index];
              expect(applicant.FkSharedContactId).toBe(
                sendApplicant.FkSharedContactId
              );
              expect(applicant.email).toBe(sendApplicant.Email);
            }
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

  it("Dip save and change building type", async (done) => {
    let caseId: string;
    const server = app.getHttpServer();
    const buildingTypeContent: ChangeBuildingTypeDto = {
      BuildingType: "non_development",
    };
    const buildingTypeContentDevelopment: ChangeBuildingTypeDto = {
      BuildingType: "development",
    };
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
            .send({ Stage: "dip" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/building_type`)
            .send(buildingTypeContent)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.building_type).toBe(buildingTypeContent.BuildingType);
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/building_type`)
            .send(buildingTypeContentDevelopment)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.building_type).toBe(
            buildingTypeContentDevelopment.BuildingType
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

  it("Dip save and change securities", async (done) => {
    let caseId: string;
    const server = app.getHttpServer();

    const securitiesDetails: ChangeSecuritiesDto = generateSecurityContent();
    const otherSecuritiesDetails: ChangeSecuritiesDto = generateSecurityContent();

    const compareSecurities = (
      dip: { securities: Array<Record<string, string | number>> },
      securitiesDetails: ChangeSecuritiesDto
    ) => {
      expect(dip.securities.length).toBe(securitiesDetails.securities.length);
      dip.securities.forEach(
        (security: Record<string, string | number>, index: number) => {
          const sendSecurity = securitiesDetails.securities[index];
          expect(security.security_address_line_1).toBe(
            sendSecurity.SecurityAddressLine1
          );
          expect(security.security_address_line_2).toBe(
            sendSecurity.SecurityAddressLine2
          );

          expect(security.estimated_90_day_gdv).toBe(
            sendSecurity.Estimated90DayGdv
          );
          expect(security.current_estimated_90_day_market_value).toBe(
            sendSecurity.CurrentEstimated90DayMarketValue
          );

          expect(security.opfl_charge_type).toBe(sendSecurity.OpflType);

          delete sendSecurity.SecurityAddressLine1;
          delete sendSecurity.SecurityAddressLine2;
          delete sendSecurity.Estimated90DayGdv;
          delete sendSecurity.CurrentEstimated90DayMarketValue;

          if (sendSecurity.OpflType === "first_charge") {
            expect(security.value_existing_mortgage).toBeNull();
            delete sendSecurity.ValueExistingMortgage;
          }

          delete sendSecurity.OpflType;

          Object.entries(sendSecurity).forEach(([key, sendValue]) => {
            const underscoreKey = underscore(key);
            expect(security[underscoreKey]).toBe(sendValue);
          });
        }
      );
    };
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
            .send({ Stage: "dip" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/securities`)
            .send(securitiesDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          compareSecurities(dip, securitiesDetails);
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/securities`)
            .send(otherSecuritiesDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          compareSecurities(dip, otherSecuritiesDetails);
          cb(null, results);
          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });

  it("Dip save and change loan details", async (done) => {
    let caseId: string;
    const server = app.getHttpServer();

    const getLoanDetails = (): ChangeLoanDetailsDto => ({
      LoanTerm: faker.random.number(24),
      LoanType: faker.random.arrayElement(loanTypes),
      LoanPurpose: faker.random.arrayElement(loanPurposes),
    });
    const loanDetails = getLoanDetails();
    const otherLoanDetails = getLoanDetails();

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
            .send({ Stage: "dip" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/loan_details`)
            .send(loanDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.loan_term).toBe(loanDetails.LoanTerm);
          expect(dip.loan_purpose).toBe(loanDetails.LoanPurpose);
          expect(dip.type_of_loan).toBe(loanDetails.LoanType);

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/loan_details`)
            .send(otherLoanDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.loan_term).toBe(otherLoanDetails.LoanTerm);
          expect(dip.loan_purpose).toBe(otherLoanDetails.LoanPurpose);
          expect(dip.type_of_loan).toBe(otherLoanDetails.LoanType);

          cb(null, results);

          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });

  it("Dip save and change financial details", async (done) => {
    let caseId: string;
    const server = app.getHttpServer();

    const financialDetails = generateFinancialDetails();
    const otherFinancialDetails = generateFinancialDetails();

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
            .send({ Stage: "dip" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/financial_details`)
            .send(financialDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.build_period).toBe(financialDetails.BuildPeriodMonths);
          expect(dip.max_ltv).toBe(financialDetails.MaxLtvDayOne);
          expect(dip.further_draw_downs).toBe(
            financialDetails.FurtherDrawDowns
          );
          expect(dip.ltv_to_gdv).toBe(financialDetails.LtvToGdv);
          expect(dip.purchase_price).toBe(financialDetails.PurchasePrice);

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/financial_details`)
            .send(otherFinancialDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.build_period).toBe(
            otherFinancialDetails.BuildPeriodMonths
          );
          expect(dip.max_ltv).toBe(otherFinancialDetails.MaxLtvDayOne);
          expect(dip.further_draw_downs).toBe(
            otherFinancialDetails.FurtherDrawDowns
          );
          expect(dip.ltv_to_gdv).toBe(otherFinancialDetails.LtvToGdv);
          expect(dip.purchase_price).toBe(otherFinancialDetails.PurchasePrice);

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/financial_details`)
            .send({ MaxLtvDayOne: 75 })
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.max_ltv).toBe(75);
          expect(dip.build_period).toBeNull();
          expect(dip.further_draw_downs).toBeNull();
          expect(dip.ltv_to_gdv).toBeNull();
          expect(dip.purchase_price).toBeNull();

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body;
          expect(dip.steps).toEqual([
            expect.objectContaining({ Name: DIP_SUMMARY }),
            expect.objectContaining({ Name: FINANCIAL_DETAILS }),
          ]);

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

  it("Dip save and change financial calculator details", async (done) => {
    let caseId: string;
    const server = app.getHttpServer();

    const compareFinancialDetails = (
      send: ChangeFinancialCalculatorDetailsDto,
      saved: Record<string, unknown> & {
        calculator_response: Record<string, unknown>;
      }
    ) => {
      Object.entries(send).forEach(([key, sendValue]) => {
        const underscoreKey = underscore(key);
        if (underscoreKey in saved) {
          switch (key) {
            case "InitialNetLoanAmount": {
              expect(
                saved.calculator_response.net_amount_of_first_advance
              ).toBe(sendValue);
              break;
            }
            case "furtherAdvances": {
              expect(saved[underscoreKey]).toEqual(sendValue);
              break;
            }
            case "StartDate": {
              expect(
                moment(saved[underscoreKey]).format(moment.HTML5_FMT.DATE)
              ).toEqual(sendValue);
              break;
            }
            default: {
              expect(saved[underscoreKey]).toBe(sendValue);
            }
          }
        } else if (underscoreKey == "drawdowns") {
          const { drawdowns } = saved.calculator_response as {
            drawdowns: Record<string, unknown>[];
          };
          sendValue.forEach((sendDrawdown: DipDrawdown, index: number) => {
            const savedDrawdown = drawdowns[index];

            Object.entries(sendDrawdown).forEach(
              ([drawdownKey, sendDrawdownValue]) => {
                const underscoreDrawdownKey = underscore(drawdownKey);

                expect(savedDrawdown[underscoreDrawdownKey]).toBe(
                  sendDrawdownValue
                );
              }
            );
          });
        } else {
          switch (key) {
            case "ArrangementFee": {
              expect(saved.calculator_response.arrangement_fee_in_value).toBe(
                sendValue
              );
              break;
            }
            case "ArrangementFeeRepayment": {
              expect(saved.calculator_response.exit_fee_value).toBe(sendValue);
              break;
            }
            case "GrossTotalLoanAmount": {
              expect(saved.calculator_response.gross_loan).toBe(sendValue);
              break;
            }
            case "InitialNetLoanAmountInput": {
              expect(saved.initial_net_loan_amount).toBe(sendValue);

              break;
            }
            case "ArrangementFeeInput": {
              expect(saved.arrangement_fee_advance_date_value).toBe(sendValue);

              break;
            }
            case "ArrangementFeePercent": {
              expect(saved.arrangement_fee_advance_date_percent).toBe(
                sendValue
              );

              break;
            }
            case "IntermediaryCommissionFeeValue": {
              expect(saved.intermediary_commission_fee_value).toBe(sendValue);
              break;
            }
            case "IntermediaryCommissionFeePercent": {
              expect(saved.intermediary_commission_fee_percent).toBe(sendValue);
              break;
            }
            case "ArrangementFeeRepaymentInput": {
              expect(saved.arrangement_fee_repayment_date_value).toBe(
                sendValue
              );
              break;
            }
            case "Gdltv90Day": {
              expect(saved.calculator_response.gdltv_90_day).toBe(sendValue);
              break;
            }
            default: {
              expect(saved.calculator_response[underscoreKey]).toBe(sendValue);
            }
          }
        }
      });
    };

    const financialDetails = generateFinancialCalculatorDetails();
    const otherFinancialDetails = generateFinancialCalculatorDetails();

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
            .send({ Stage: "dip" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/financial_calculator_details`)
            .send(financialDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.market_value).toBe(financialDetails.MarketValue);

          compareFinancialDetails(financialDetails, dip);

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/financial_calculator_details`)
            .send(otherFinancialDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          getDip(caseId, server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body.data.attributes;
          expect(dip.market_value).toBe(otherFinancialDetails.MarketValue);

          compareFinancialDetails(otherFinancialDetails, dip);
          cb(null, results);
          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });

  it("Dip save company not in CH", async (done) => {
    let caseId: string;
    const server = app.getHttpServer();
    const companyDetails: ChangeContactCompanyDto = {
      ContactType: "company",
      CompanyName: faker.company.companyName(),
      CompanyNumber: "N/A",
      CompanyEmail: faker.internet.email(),
    };

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
            .send({ Stage: "dip" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/dip/contact_company`)
            .send(companyDetails)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get(`/cases/${caseId}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const { dip } = results.body;
          expect(dip.CompanyName).toBe(companyDetails.CompanyName);
          expect(dip.CompanyEmail).toBe(companyDetails.CompanyEmail);
          expect(dip.CompanyNumber).toBe(companyDetails.CompanyNumber);

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

import { CommandBus } from "@nestjs/cqrs";
import { Test, TestingModule } from "@nestjs/testing";
import { Dip } from "@v2/modules/cases/dip/dip.interface";

import { CasesIdentificationService } from "../../../src/v2/modules/cases/cases-identification.service";
import {
  APPLICANT_DETAILS,
  ChangeIntroducerDetailsCommandContent,
  DIP_SUMMARY,
  FINANCIAL_DETAILS,
  FINANCIAL_DETAILS_SUMMARY,
  INTRODUCER_DETAILS,
  LOAN_DETAILS,
  SECURITY_DETAILS,
  TYPE_OF_APPLICANT,
  TYPE_OF_LOAN,
} from "../../../src/v2/modules/cases/dip/dip.interface";
import {
  ChangeContactCompanyContent,
  ChangeContactIndividualContent,
} from "../../../src/v2/modules/cases/dip/dip.contact.interface";
import {
  DipRepositoryInterface,
  DipService,
} from "../../../src/v2/modules/cases/dip/dip.service";
import { generateSecurityContent } from "./helpers/generate-security-content";
import { CaseId, InMemoryRepository } from "./in-memory-repository";
import { generateFinancialCalculatorDetails } from "./helpers/generate-financial-calculator-details-content";
import { getRandomEnquiry } from "../enquiry/enquiry.test.helpers";
import { ContactsService } from "../../../src/v2/modules/admin/contacts/contacts.service";

class CasesIdentificationServiceMock {
  getByCaseUuid() {
    return { CaseId };
  }
}

describe("DipService", () => {
  let service: DipService;

  const commandBusExecuteMock = jest.fn();
  const uuid = "uuid";

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DipService,
        {
          provide: DipRepositoryInterface,
          useClass: InMemoryRepository,
        },
        {
          provide: CasesIdentificationService,
          useClass: CasesIdentificationServiceMock,
        },
        {
          provide: CommandBus,
          useValue: { execute: commandBusExecuteMock },
        },
        {
          provide: ContactsService,
          useValue: { getOne: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<DipService>(DipService);
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Create from enquiry", () => {
    it("Should create new dip from enquiry via broker", async () => {
      const enquiry = getRandomEnquiry();
      const expectedDip: Dip = {
        FkCaseId: CaseId,
        FkOriginatorId: enquiry.FkOriginatorId,
        IntroducerType: "via_broker",
        BuildPeriodMonths: enquiry.BuildPeriod,
        FkBrokerCompanyId: enquiry.FkBrokerCompanyId,
        FkBrokerIndividualId: enquiry.FkBrokerIndividualId,
        MaxLtvDayOne: enquiry.MaximumLtv,
        LoanTerm: enquiry.LoanPeriod,
        LoanType: enquiry.InterestType,
        InterestRate: enquiry.InterestRate,
        ArrangementFeePercent: enquiry.ArrangementFeeTotal,
        IntermediaryCommissionFeePercent: enquiry.ArrangementFeeBroker,
        NetAmountOfFirstAdvance: enquiry.NetLoanAmount,
        AdvanceType:
          enquiry.BuildPeriod && enquiry.BuildPeriod > 0
            ? "multiple"
            : "single",
        LtvToGdv: enquiry.MaximumGdltv,
        FurtherDrawDowns: enquiry.FurtherDrawdownsAmount,
        StartingPoint: enquiry.CalculateMaxFromSecurity
          ? "market_value"
          : "initial_net_loan_amount",
        ValueTypeOfArrangementFee: "percent",
        ValueTypeOfIntermediaryFee: "percent",
      };

      const expectedSecurity = {
        SecurityInitialEstimation: enquiry.EstimatedSecurityValue,
        Gdv: enquiry.Gdv,
        SecurityType: enquiry.PropertyType,
        SecurityAddressLine1: enquiry.PropertyLocation,
        SecurityTownCity: "",
        SecurityPostcode: "",
        SecurityCountry: "",
        OpflType: "first_charge",
      };

      await service.createFromEnquiry("", enquiry);

      const addedDip = await service.getByCaseId(CaseId);

      expect(addedDip).toEqual(expect.objectContaining(expectedDip));

      expect(addedDip.securities.length).toBe(1);

      expect(addedDip.securities[0]).toEqual(
        expect.objectContaining(expectedSecurity)
      );
    });
  });

  describe("Edit dip", () => {
    describe("Introducer", () => {
      it("Saves new introducer type", async () => {
        await service.createDip(uuid);
        await service.changeIntroducerType(uuid, {
          FkOriginatorId: 1,
          IntroducerType: "direct_application",
        });

        const dip = await service.getByCaseId(CaseId);

        expect(dip.IntroducerType).toBe("direct_application");

        expect(dip.steps).toEqual([
          { Name: DIP_SUMMARY, name: DIP_SUMMARY },
          { Name: INTRODUCER_DETAILS, name: INTRODUCER_DETAILS },
          { Name: INTRODUCER_DETAILS, name: INTRODUCER_DETAILS },
        ]);
        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkOriginatorId: 1,
              FkCaseId: CaseId,
              IntroducerType: "direct_application",
            },
          })
        );
      });

      it("Change introducer verifies if is different and executes command", async () => {
        await service.createDip(uuid);
        await service.changeIntroducerType(uuid, {
          FkOriginatorId: 1,
          IntroducerType: "direct_application",
        });

        const dip = await service.getByCaseId(CaseId);

        expect(dip.IntroducerType).toBe("direct_application");
        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkOriginatorId: 1,
              FkCaseId: CaseId,
              IntroducerType: "direct_application",
            },
          })
        );
        expect(commandBusExecuteMock).toBeCalledTimes(3);

        await service.changeIntroducerType(uuid, {
          FkOriginatorId: 1,
          IntroducerType: "direct_application",
        });
        expect(commandBusExecuteMock).toBeCalledTimes(3);
      });

      it("Change Executes command only for changed field", async () => {
        await service.createDip(uuid);
        await service.changeIntroducerType(uuid, {
          FkOriginatorId: 1,
          IntroducerType: "direct_application",
        });

        const dip = await service.getByCaseId(CaseId);

        expect(dip.IntroducerType).toBe("direct_application");
        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkOriginatorId: 1,
              FkCaseId: CaseId,
              IntroducerType: "direct_application",
            },
          })
        );
        expect(commandBusExecuteMock).toBeCalledTimes(3);

        await service.changeIntroducerType(uuid, {
          FkOriginatorId: 1,
          IntroducerType: "via_broker",
        });

        const changedDip = await service.getByCaseId(CaseId);

        expect(changedDip.IntroducerType).toBe("via_broker");
        expect(commandBusExecuteMock).toBeCalledTimes(4);
      });

      it("Saves new introducer details only for broker", async () => {
        await service.createDip(uuid);
        await service.changeIntroducerType(uuid, {
          FkOriginatorId: 1,
          IntroducerType: "direct_application",
        });

        commandBusExecuteMock.mockClear();

        const brokerDetails: ChangeIntroducerDetailsCommandContent = {
          FkBrokerCompanyId: 1,
          FkBrokerIndividualId: 2,
        };
        const result = await service.changeBrokerDetails(uuid, brokerDetails);
        expect(result).not.toBeInstanceOf(Error);

        expect(commandBusExecuteMock).toBeCalledTimes(1);
        await service.changeIntroducerType(uuid, {
          FkOriginatorId: 1,
          IntroducerType: "via_broker",
        });

        const nextResult = await service.changeBrokerDetails(
          uuid,
          brokerDetails
        );
        expect(nextResult).toBeUndefined();

        const dip = await service.getByCaseId(CaseId);
        expect(dip.FkBrokerCompanyId).toBe(brokerDetails.FkBrokerCompanyId);
        expect(dip.FkBrokerIndividualId).toBe(
          brokerDetails.FkBrokerIndividualId
        );

        expect.arrayContaining(
          expect.arrayContaining([
            { Name: INTRODUCER_DETAILS, name: INTRODUCER_DETAILS },
            { Name: INTRODUCER_DETAILS, name: INTRODUCER_DETAILS },
          ])
        );

        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: { ...brokerDetails, FkCaseId: CaseId },
          })
        );
      });

      it("Change broker verifies if is different and executes command", async () => {
        await service.createDip(uuid);
        await service.changeIntroducerType(uuid, {
          FkOriginatorId: 1,
          IntroducerType: "via_broker",
        });

        commandBusExecuteMock.mockClear();

        const brokerDetails: ChangeIntroducerDetailsCommandContent = {
          FkBrokerCompanyId: 1,
          FkBrokerIndividualId: 2,
        };

        await service.changeBrokerDetails(uuid, brokerDetails);

        expect(commandBusExecuteMock).toBeCalledTimes(1);

        await service.changeBrokerDetails(uuid, brokerDetails);

        expect(commandBusExecuteMock).toBeCalledTimes(1);

        await service.changeBrokerDetails(uuid, {
          ...brokerDetails,
          FkBrokerIndividualId: 3,
        });

        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              ...brokerDetails,
              FkCaseId: CaseId,
              FkBrokerIndividualId: 3,
            },
          })
        );
      });

      it("Clears broker details when changed to direct application", async () => {
        await service.createDip(uuid);
        await service.changeIntroducerType(uuid, {
          FkOriginatorId: 1,
          IntroducerType: "via_broker",
        });

        const brokerDetails: ChangeIntroducerDetailsCommandContent = {
          FkBrokerCompanyId: 1,
          FkBrokerIndividualId: 2,
        };

        await service.changeFinancialCalculatorDetails(uuid, {
          IntermediaryCommissionFeeValue: 1,
          IntermediaryCommissionFeePercent: 2,
        });

        await service.changeBrokerDetails(uuid, brokerDetails);

        commandBusExecuteMock.mockClear();
        await service.changeIntroducerType(uuid, {
          FkOriginatorId: 1,
          IntroducerType: "direct_application",
        });

        const dip = await service.getByCaseId(CaseId);
        expect(dip.FkBrokerCompanyId).toBe(null);
        expect(dip.FkBrokerIndividualId).toBe(null);

        expect(commandBusExecuteMock).toBeCalledTimes(3);
      });
    });

    describe("Advance Type", () => {
      it("Saves new advance type", async () => {
        await service.createDip(uuid);
        await service.changeAdvanceType(uuid, {
          AdvanceType: "single",
        });

        const dip = await service.getByCaseId(CaseId);

        expect(dip.AdvanceType).toBe("single");

        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkCaseId: CaseId,
              AdvanceType: "single",
            },
          })
        );

        expect(dip.steps).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ Name: TYPE_OF_LOAN }),
          ])
        );
      });

      it("Updates advance type", async () => {
        await service.createDip(uuid);
        await service.changeAdvanceType(uuid, {
          AdvanceType: "single",
        });

        commandBusExecuteMock.mockClear();

        await service.changeAdvanceType(uuid, {
          AdvanceType: "single",
        });

        expect(commandBusExecuteMock).toHaveBeenCalledTimes(0);

        await service.changeAdvanceType(uuid, {
          AdvanceType: "multiple",
        });

        const dip = await service.getByCaseId(CaseId);

        expect(dip.AdvanceType).toBe("multiple");
        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkCaseId: CaseId,
              AdvanceType: "multiple",
            },
          })
        );
      });
    });

    describe("Contact", () => {
      describe("Company", () => {
        it("Saves new company contact", async () => {
          await service.createDip(uuid);

          const companyContact: ChangeContactCompanyContent = {
            ContactType: "company",
            CompanyEmail: "email",
            CompanyName: "name",
            CompanyNumber: "number",
          };
          await service.changeContact(uuid, companyContact);

          const dip = await service.getByCaseId(CaseId);

          expect(dip).toEqual(expect.objectContaining(companyContact));

          expect(commandBusExecuteMock).toHaveBeenCalledWith(
            expect.objectContaining({
              content: {
                FkCaseId: CaseId,
                ...companyContact,
              },
            })
          );
          expect(commandBusExecuteMock).toHaveBeenCalledTimes(2);

          expect(dip.steps).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ Name: TYPE_OF_APPLICANT }),
              expect.objectContaining({ Name: APPLICANT_DETAILS }),
            ])
          );
        });

        it("Updates company contact", async () => {
          await service.createDip(uuid);

          const companyContact: ChangeContactCompanyContent = {
            ContactType: "company",
            CompanyEmail: "email",
            CompanyName: "name",
            CompanyNumber: "number",
          };
          await service.changeContact(uuid, companyContact);

          expect(commandBusExecuteMock).toHaveBeenCalledWith(
            expect.objectContaining({
              content: {
                FkCaseId: CaseId,
                ...companyContact,
              },
            })
          );
          expect(commandBusExecuteMock).toHaveBeenCalledTimes(2);

          commandBusExecuteMock.mockClear();

          await service.changeContact(uuid, companyContact);

          expect(commandBusExecuteMock).toHaveBeenCalledTimes(0);

          const otherContact = {
            ...companyContact,
            CompanyEmail: "other email",
          };
          await service.changeContact(uuid, otherContact);

          const dip = await service.getByCaseId(CaseId);

          expect(dip).toEqual(expect.objectContaining(otherContact));
          expect(commandBusExecuteMock).toHaveBeenCalledWith(
            expect.objectContaining({
              content: {
                FkCaseId: CaseId,
                ...otherContact,
              },
            })
          );
          expect(commandBusExecuteMock).toHaveBeenCalledTimes(1);
        });
      });

      describe("Individual", () => {
        it("Saves new individual contact", async () => {
          await service.createDip(uuid);

          const individualContact: ChangeContactIndividualContent = {
            ContactType: "individual",
            contacts: [{ FkSharedContactId: 1, Email: "email" }],
          };
          await service.changeContact(uuid, individualContact);

          const dip = await service.getByCaseId(CaseId);

          expect(dip.contacts[0]).toEqual(
            expect.objectContaining(individualContact.contacts[0])
          );

          expect(commandBusExecuteMock).toHaveBeenCalledWith(
            expect.objectContaining({
              content: {
                FkCaseId: CaseId,
                ...individualContact,
              },
            })
          );
          expect(commandBusExecuteMock).toHaveBeenCalledTimes(2);
          expect(dip.steps).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ Name: TYPE_OF_APPLICANT }),
              expect.objectContaining({ Name: APPLICANT_DETAILS }),
            ])
          );
        });

        it("Updates individual contact", async () => {
          await service.createDip(uuid);

          const individualContact: ChangeContactIndividualContent = {
            ContactType: "individual",
            contacts: [{ FkSharedContactId: 1, Email: "email" }],
          };
          await service.changeContact(uuid, individualContact);

          expect(commandBusExecuteMock).toHaveBeenCalledWith(
            expect.objectContaining({
              content: {
                FkCaseId: CaseId,
                ...individualContact,
              },
            })
          );
          expect(commandBusExecuteMock).toHaveBeenCalledTimes(2);

          commandBusExecuteMock.mockClear();

          await service.changeContact(uuid, individualContact);

          expect(commandBusExecuteMock).toHaveBeenCalledTimes(0);
          commandBusExecuteMock.mockClear();

          const otherContact: ChangeContactIndividualContent = {
            ContactType: "individual",
            contacts: [
              { FkSharedContactId: 1, Email: "email" },
              { FkSharedContactId: 2, Email: "other_email" },
            ],
          };
          await service.changeContact(uuid, otherContact);

          const dip = await service.getByCaseId(CaseId);

          expect(dip.contacts.length).toBe(otherContact.contacts.length);
          expect(dip.contacts[0]).toEqual(
            expect.objectContaining(otherContact.contacts[0])
          );

          expect(dip.contacts[1]).toEqual(
            expect.objectContaining(otherContact.contacts[1])
          );

          expect(commandBusExecuteMock).toHaveBeenCalledWith(
            expect.objectContaining({
              content: {
                FkCaseId: CaseId,
                ...otherContact,
              },
            })
          );
          expect(commandBusExecuteMock).toHaveBeenCalledTimes(1);
          commandBusExecuteMock.mockClear();

          const thirdContact: ChangeContactIndividualContent = {
            ContactType: "individual",
            contacts: [{ FkSharedContactId: 1, Email: "email" }],
          };
          await service.changeContact(uuid, thirdContact);

          const changedDip = await service.getByCaseId(CaseId);

          expect(changedDip.contacts.length).toBe(thirdContact.contacts.length);
          expect(changedDip.contacts[0]).toEqual(
            expect.objectContaining(thirdContact.contacts[0])
          );

          expect(commandBusExecuteMock).toHaveBeenCalledWith(
            expect.objectContaining({
              content: {
                FkCaseId: CaseId,
                ...thirdContact,
              },
            })
          );
          expect(commandBusExecuteMock).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("Building Type", () => {
      it("Saves new building type", async () => {
        await service.createDip(uuid);
        await service.changeBuildingType(uuid, {
          BuildingType: "development",
        });

        const dip = await service.getByCaseId(CaseId);

        expect(dip.BuildingType).toBe("development");

        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkCaseId: CaseId,
              BuildingType: "development",
            },
          })
        );
        expect(dip.steps).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ Name: DIP_SUMMARY }),
          ])
        );
      });

      it("Updates building type", async () => {
        await service.createDip(uuid);
        await service.changeBuildingType(uuid, {
          BuildingType: "non_development",
        });

        commandBusExecuteMock.mockClear();

        await service.changeBuildingType(uuid, {
          BuildingType: "non_development",
        });

        expect(commandBusExecuteMock).toHaveBeenCalledTimes(0);

        await service.changeBuildingType(uuid, {
          BuildingType: "development",
        });

        const dip = await service.getByCaseId(CaseId);

        expect(dip.BuildingType).toBe("development");
        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkCaseId: CaseId,
              BuildingType: "development",
            },
          })
        );
      });
    });

    describe("Security details", () => {
      it("Saves new security details", async () => {
        await service.createDip(uuid);
        const securityDetails = generateSecurityContent();
        securityDetails.securities = securityDetails.securities.map(
          (security) => ({
            ...security,
            ValueExistingMortgage:
              security.OpflType === "first_charge"
                ? null
                : security.ValueExistingMortgage,
          })
        );
        await service.changeSecurities(uuid, securityDetails);

        const dip = await service.getByCaseId(CaseId);

        expect(dip.securities.length).toBe(securityDetails.securities.length);

        securityDetails.securities.forEach((sendSecurity, index) => {
          const dipSecurity = dip.securities[index] as Record<
            string,
            string | number
          >;
          Object.entries(sendSecurity).forEach(([key, sendValue]) => {
            expect(dipSecurity[key]).toBe(sendValue);
          });
        });
        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkCaseId: CaseId,
              ...securityDetails,
            },
          })
        );
        expect(dip.steps).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ Name: SECURITY_DETAILS }),
          ])
        );
      });

      it("Updates security details", async () => {
        await service.createDip(uuid);
        const securityDetails = generateSecurityContent();
        securityDetails.securities = securityDetails.securities.map(
          (security) => ({
            ...security,
            ValueExistingMortgage:
              security.OpflType === "first_charge"
                ? null
                : security.ValueExistingMortgage,
          })
        );
        await service.changeSecurities(uuid, securityDetails);
        commandBusExecuteMock.mockClear();

        await service.changeSecurities(uuid, securityDetails);

        expect(commandBusExecuteMock).toHaveBeenCalledTimes(0);

        const otherSecurityDetails = generateSecurityContent();
        otherSecurityDetails.securities = otherSecurityDetails.securities.map(
          (security) => ({
            ...security,
            ValueExistingMortgage:
              security.OpflType === "first_charge"
                ? null
                : security.ValueExistingMortgage,
          })
        );
        await service.changeSecurities(uuid, otherSecurityDetails);

        const dip = await service.getByCaseId(CaseId);

        expect(dip.securities.length).toBe(
          otherSecurityDetails.securities.length
        );

        otherSecurityDetails.securities.forEach((sendSecurity, index) => {
          const dipSecurity = dip.securities[index] as Record<
            string,
            string | number
          >;
          Object.entries(sendSecurity).forEach(([key, sendValue]) => {
            expect(dipSecurity[key]).toBe(sendValue);
          });
        });
        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkCaseId: CaseId,
              ...otherSecurityDetails,
            },
          })
        );
      });
    });

    describe("Loan Details", () => {
      it("Saves new Loan Details", async () => {
        await service.createDip(uuid);
        await service.changeLoanDetails(uuid, {
          LoanType: "retained",
          LoanPurpose: "purchase",
          LoanTerm: 23,
        });

        const dip = await service.getByCaseId(CaseId);

        expect(dip.LoanType).toBe("retained");
        expect(dip.LoanPurpose).toBe("purchase");
        expect(dip.LoanTerm).toBe(23);

        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkCaseId: CaseId,
              LoanType: "retained",
              LoanPurpose: "purchase",
              LoanTerm: 23,
            },
          })
        );
        expect(dip.steps).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ Name: LOAN_DETAILS }),
          ])
        );
      });

      it("Updates Loan Details", async () => {
        await service.createDip(uuid);
        await service.changeLoanDetails(uuid, {
          LoanType: "retained",
          LoanPurpose: "purchase",
          LoanTerm: 23,
        });

        commandBusExecuteMock.mockClear();

        await service.changeLoanDetails(uuid, {
          LoanType: "retained",
          LoanPurpose: "purchase",
          LoanTerm: 23,
        });

        expect(commandBusExecuteMock).toHaveBeenCalledTimes(0);

        await service.changeLoanDetails(uuid, {
          LoanType: "rolled_up",
          LoanPurpose: "refinance",
          LoanTerm: 10,
        });

        const dip = await service.getByCaseId(CaseId);

        expect(dip.LoanType).toBe("rolled_up");
        expect(dip.LoanPurpose).toBe("refinance");
        expect(dip.LoanTerm).toBe(10);

        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkCaseId: CaseId,
              LoanType: "rolled_up",
              LoanPurpose: "refinance",
              LoanTerm: 10,
            },
          })
        );
      });
    });

    describe("Financial Details", () => {
      const financialDetails = {
        MaxLtvDayOne: 65,
        BuildPeriodMonths: 43,
        FurtherDrawDowns: 2000,
        LtvToGdv: 45,
        PurchasePrice: 1000,
      };
      it("Saves new Financial Details", async () => {
        await service.createDip(uuid);

        await service.changeFinancialDetails(uuid, financialDetails);

        const dip = await service.getByCaseId(CaseId);

        expect(dip).toEqual(expect.objectContaining(financialDetails));

        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkCaseId: CaseId,
              ...financialDetails,
            },
          })
        );
        expect(dip.steps).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ Name: FINANCIAL_DETAILS }),
          ])
        );
      });

      it("Updates Financial Details", async () => {
        await service.createDip(uuid);
        await service.changeFinancialDetails(uuid, financialDetails);

        commandBusExecuteMock.mockClear();

        await service.changeFinancialDetails(uuid, financialDetails);

        expect(commandBusExecuteMock).toHaveBeenCalledTimes(0);

        await service.changeFinancialDetails(uuid, {
          MaxLtvDayOne: 65,
        });

        const dip = await service.getByCaseId(CaseId);

        expect(dip.MaxLtvDayOne).toBe(65);
        expect(dip.BuildPeriodMonths).toBeNull();
        expect(dip.FurtherDrawDowns).toBeNull();
        expect(dip.LtvToGdv).toBeNull();
        expect(dip.PurchasePrice).toBeNull();

        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkCaseId: CaseId,
              MaxLtvDayOne: 65,
              BuildPeriodMonths: null,
              FurtherDrawDowns: null,
              LtvToGdv: null,
              PurchasePrice: null,
            },
          })
        );
      });
    });

    describe("Financial Calculator Details", () => {
      const financialDetails = generateFinancialCalculatorDetails();
      it("Saves new Financial Details", async () => {
        await service.createDip(uuid);

        await service.changeFinancialCalculatorDetails(uuid, financialDetails);

        const dip = await service.getByCaseId(CaseId);

        const { drawdowns, ...rest } = financialDetails;
        expect(dip).toEqual(expect.objectContaining(rest));
        drawdowns.forEach((drawdown, index) => {
          const savedDrawdown = dip.drawdowns[index];
          expect(savedDrawdown).toEqual(expect.objectContaining(drawdown));
        });

        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkCaseId: CaseId,
              ...financialDetails,
            },
          })
        );
        expect(dip.steps).toEqual([
          expect.objectContaining({ Name: DIP_SUMMARY }),
          expect.objectContaining({ Name: FINANCIAL_DETAILS_SUMMARY }),
        ]);
      });

      it("Updates Financial Details", async () => {
        await service.createDip(uuid);
        await service.changeFinancialCalculatorDetails(uuid, financialDetails);

        commandBusExecuteMock.mockClear();

        await service.changeFinancialCalculatorDetails(uuid, financialDetails);

        expect(commandBusExecuteMock).toHaveBeenCalledTimes(0);

        const otherDetails = generateFinancialCalculatorDetails();
        await service.changeFinancialCalculatorDetails(uuid, otherDetails);

        const dip = await service.getByCaseId(CaseId);

        const { drawdowns, ...rest } = otherDetails;

        expect(dip).toEqual(expect.objectContaining(rest));
        drawdowns.forEach((drawdown, index) => {
          const savedDrawdown = dip.drawdowns[index];
          expect(savedDrawdown).toEqual(expect.objectContaining(drawdown));
        });
        expect(commandBusExecuteMock).toHaveBeenCalledWith(
          expect.objectContaining({
            content: {
              FkCaseId: CaseId,
              ...otherDetails,
            },
          })
        );
      });
    });

    describe("Cross step changes", () => {
      it("Change to direct clears intermediary fees", async () => {
        await service.createDip(uuid);
        await service.changeFinancialCalculatorDetails(uuid, {
          IntermediaryCommissionFeePercent: 1,
          IntermediaryCommissionFeeValue: 100,
        });

        const dip = await service.getByCaseId(CaseId);
        expect(dip.IntermediaryCommissionFeePercent).toBe(1);
        expect(dip.IntermediaryCommissionFeeValue).toBe(100);

        await service.changeIntroducerType(uuid, {
          FkOriginatorId: 1,
          IntroducerType: "direct_application",
        });

        const changedDip = await service.getByCaseId(CaseId);
        expect(changedDip.IntermediaryCommissionFeePercent).toBeNull();
        expect(changedDip.IntermediaryCommissionFeeValue).toBeNull();
      });

      it("Change to single advance clears multiple advance fields", async () => {
        await service.createDip(uuid);
        await service.changeFinancialDetails(uuid, {
          BuildPeriodMonths: 10,
          FurtherDrawDowns: 20,
          LtvToGdv: 30,
        });

        await service.changeFinancialCalculatorDetails(uuid, {
          FurtherAdvances: "[1,2,3]",
        });

        const dip = await service.getByCaseId(CaseId);
        expect(dip.FurtherAdvances).toBe("[1,2,3]");
        expect(dip.FurtherDrawDowns).toBe(20);
        expect(dip.LtvToGdv).toBe(30);
        expect(dip.BuildPeriodMonths).toBe(10);

        await service.changeAdvanceType(uuid, {
          AdvanceType: "single",
        });

        const changedDip = await service.getByCaseId(CaseId);
        expect(changedDip.FurtherAdvances).toBeNull();
        expect(changedDip.FurtherDrawDowns).toBeNull();
        expect(changedDip.LtvToGdv).toBeNull();
        expect(changedDip.BuildPeriodMonths).toBeNull();
      });
    });
  });
});

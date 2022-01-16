import { CqrsModule } from "@nestjs/cqrs";
import { Test, TestingModule } from "@nestjs/testing";

import {
  ApplicantDetailsStepName,
  ApplicationRepositoryInterface,
  AssetsAndLiabilitiesStepName,
  CompanyDetailsStepName,
  CreditHistoryStepName,
  DeclarationsStepName,
  IntroducerDetailStepName,
  LoanDetailsStepName,
  RecheckStatus,
  SecurityDetailsStepName,
  ValuationReportStepName,
  AdditionalInformationStepName,
  AmlKycStepName,
} from "../../../src/v2/modules/cases/application/application.interface";
import { ChangedDipIntroducerTypeEventHandler } from "../../../src/v2/modules/cases/application/handlers/changed-dip-introducer-type-event.handler";
import { ChangedDipAdvanceTypeEventHandler } from "../../../src/v2/modules/cases/application/handlers/changed-dip-advance-type-event.handler";
import { ChangedDipIntroducerDetailsEventHandler } from "../../../src/v2/modules/cases/application/handlers/changed-dip-introducer-details-event.handler";
import { CasesIdentificationService } from "../../../src/v2/modules/cases/cases-identification.service";
import {
  DipRepositoryInterface,
  DipService,
} from "../../../src/v2/modules/cases/dip/dip.service";
import { ChangeIntroducerTypeCommandHandler } from "../../../src/v2/modules/cases/dip/handlers/change-introducer-type-command.handler";
import { ChangeIntroducerDetailsCommandHandler } from "../../../src/v2/modules/cases/dip/handlers/change-introducer-details-command.handler";
import { CommandsRepository } from "../../../src/v2/utils/commands";
import { ChangeAdvanceTypeCommandHandler } from "../../../src/v2/modules/cases/dip/handlers/change-advance-type-command.handler";
import { CaseId, InMemoryRepository } from "./in-memory-repository";
import { ChangeContactCommandHandler } from "../../../src/v2/modules/cases/dip/handlers/change-contact-command.handler";
import { ChangedDipContactEventHandler } from "../../../src/v2/modules/cases/application/handlers/changed-dip-contact-event.handler";
import { ChangeContactCompanyContent } from "../../../src/v2/modules/cases/dip/dip.contact.interface";
import { ChangeBuildingTypeCommandHandler } from "../../../src/v2/modules/cases/dip/handlers/change-building-type-command.handler";
import { ChangedDipBuildingTypeEventHandler } from "../../../src/v2/modules/cases/application/handlers/changed-dip-building-type-event.handler";
import { ChangedDipSecuritiesEventHandler } from "../../../src/v2/modules/cases/application/handlers/changed-dip-securities-event.handler";
import { ChangeSecuritiesCommandHandler } from "../../../src/v2/modules/cases/dip/handlers/change-securities-command.handler";
import { generateSecurityContent } from "./helpers/generate-security-content";
import { ChangedDipLoanDetailsEventHandler } from "../../../src/v2/modules/cases/application/handlers/changed-dip-loan-details-event.handler";
import { ChangeLoanDetailsCommandHandler } from "../../../src/v2/modules/cases/dip/handlers/change-loan-details-command.handler";
import { ChangeFinancialDetailsCommandHandler } from "../../../src/v2/modules/cases/dip/handlers/change-financial-details-command.handler";
import { ChangedDipFinancialDetailsEventHandler } from "../../../src/v2/modules/cases/application/handlers/changed-dip-financial-details-event.handler";
import { ChangeFinancialCalculatorDetailsCommandHandler } from "../../../src/v2/modules/cases/dip/handlers/change-financial-calculator-details-command.handler";
import { ChangedDipFinancialCalculatorDetailsEventHandler } from "../../../src/v2/modules/cases/application/handlers/changed-dip-financial-calculator-details-event.handler";
import { generateFinancialCalculatorDetails } from "./helpers/generate-financial-calculator-details-content";
import { ContactsService } from "../../../src/v2/modules/admin/contacts/contacts.service";

class CasesIdentificationServiceMock {
  getByCaseUuid() {
    return { CaseId };
  }
}
const CommandHandlers = [
  ChangeIntroducerTypeCommandHandler,
  ChangeIntroducerDetailsCommandHandler,
  ChangeAdvanceTypeCommandHandler,
  ChangeContactCommandHandler,
  ChangeBuildingTypeCommandHandler,
  ChangeSecuritiesCommandHandler,
  ChangeLoanDetailsCommandHandler,
  ChangeFinancialDetailsCommandHandler,
  ChangeFinancialCalculatorDetailsCommandHandler,
];

const waitForHandlers = async () =>
  await new Promise((resolve) => setTimeout(resolve, 0));

describe("DipChangeTrackingIntegration", () => {
  let service: DipService;

  const changeStepStatusMock = jest.fn().mockResolvedValue(null);
  const changeIndividualsStatusMock = jest.fn().mockResolvedValue(null);
  const changePropertiesStatusMock = jest.fn().mockResolvedValue(null);
  const invalidateAmlKycValidationMock = jest.fn().mockResolvedValue(null);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DipService,
        ...CommandHandlers,
        ChangedDipIntroducerTypeEventHandler,
        ChangedDipIntroducerDetailsEventHandler,
        ChangedDipAdvanceTypeEventHandler,
        ChangedDipContactEventHandler,
        ChangedDipBuildingTypeEventHandler,
        ChangedDipSecuritiesEventHandler,
        ChangedDipLoanDetailsEventHandler,
        ChangedDipFinancialDetailsEventHandler,
        ChangedDipFinancialCalculatorDetailsEventHandler,
        {
          provide: DipRepositoryInterface,
          useClass: InMemoryRepository,
        },
        {
          provide: CasesIdentificationService,
          useClass: CasesIdentificationServiceMock,
        },
        {
          provide: CommandsRepository,
          useValue: { insert: jest.fn().mockResolvedValue([]) },
        },
        {
          provide: ApplicationRepositoryInterface,
          useValue: {
            changeStepStatus: changeStepStatusMock,
            changePropertiesStatus: changePropertiesStatusMock,
            changeIndividualsStatus: changeIndividualsStatusMock,
            invalidateAmlKycValidation: invalidateAmlKycValidationMock,
          },
        },
        {
          provide: ContactsService,
          useValue: jest.fn(),
        },
      ],
      imports: [CqrsModule],
    }).compile();

    const app = module.createNestApplication();
    await app.init();

    service = module.get<DipService>(DipService);
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Change introducer type marks Introducer Details to recheck", async () => {
    await service.createDip("uuid");
    await service.changeIntroducerType("uuid", {
      FkOriginatorId: 1,
      IntroducerType: "direct_application",
    });
    await waitForHandlers();

    const dip = await service.getByCaseId(CaseId);

    expect(dip.IntroducerType).toBe("direct_application");
    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      IntroducerDetailStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toBeCalledTimes(3);

    await service.changeIntroducerType("uuid", {
      FkOriginatorId: 1,
      IntroducerType: "direct_application",
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(3);

    await service.changeIntroducerType("uuid", {
      FkOriginatorId: 1,
      IntroducerType: "via_broker",
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(4);
  });

  it("Change introducer details marks Introducer Details to recheck", async () => {
    await service.createDip("uuid");
    await service.changeIntroducerType("uuid", {
      FkOriginatorId: 1,
      IntroducerType: "via_broker",
    });
    await waitForHandlers();

    changeStepStatusMock.mockClear();

    await service.changeBrokerDetails("uuid", {
      FkBrokerCompanyId: 1,
      FkBrokerIndividualId: 2,
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      IntroducerDetailStepName,
      RecheckStatus
    );
  });

  it("Change advance type marks Loan Details to recheck", async () => {
    await service.createDip("uuid");
    await service.changeAdvanceType("uuid", {
      AdvanceType: "single",
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      LoanDetailsStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toBeCalledTimes(1);

    await service.changeAdvanceType("uuid", {
      AdvanceType: "single",
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(1);

    await service.changeAdvanceType("uuid", {
      AdvanceType: "multiple",
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(2);
  });

  it("Change contact marks applicant steps to recheck", async () => {
    await service.createDip("uuid");

    await service.changeContact("uuid", {
      ContactType: "individual",
      contacts: [
        { Email: "email", FkSharedContactId: 1 },
        { Email: "otherEmail", FkSharedContactId: 2 },
      ],
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      ApplicantDetailsStepName,
      RecheckStatus
    );
    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      CompanyDetailsStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      CreditHistoryStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AssetsAndLiabilitiesStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AdditionalInformationStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AmlKycStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      DeclarationsStepName,
      RecheckStatus
    );

    expect(changeIndividualsStatusMock).toHaveBeenCalledWith(
      CaseId,
      RecheckStatus
    );

    expect(changeIndividualsStatusMock).toBeCalledTimes(2);
    expect(invalidateAmlKycValidationMock).toBeCalledTimes(2);

    expect(changeStepStatusMock).toBeCalledTimes(14);
    jest.clearAllMocks();

    await service.changeContact("uuid", {
      ContactType: "individual",
      contacts: [
        { Email: "email", FkSharedContactId: 1 },
        { Email: "otherEmail", FkSharedContactId: 2 },
      ],
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(0);
    expect(changeIndividualsStatusMock).toBeCalledTimes(0);
    expect(invalidateAmlKycValidationMock).toBeCalledTimes(0);

    await service.changeContact("uuid", {
      ContactType: "individual",
      contacts: [
        { Email: "email", FkSharedContactId: 3 },
        { Email: "otherEmail", FkSharedContactId: 4 },
      ],
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(7);
    expect(changeIndividualsStatusMock).toBeCalledTimes(1);
    expect(invalidateAmlKycValidationMock).toBeCalledTimes(1);

    jest.clearAllMocks();

    const companyContact: ChangeContactCompanyContent = {
      ContactType: "company",
      CompanyEmail: "email",
      CompanyName: "name",
      CompanyNumber: "number",
    };
    await service.changeContact("uuid", companyContact);
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(14);
    expect(changeIndividualsStatusMock).toBeCalledTimes(2);
    expect(invalidateAmlKycValidationMock).toBeCalledTimes(2);

    jest.clearAllMocks();

    await service.changeContact("uuid", companyContact);
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(0);
    expect(changeIndividualsStatusMock).toBeCalledTimes(0);
    expect(invalidateAmlKycValidationMock).toBeCalledTimes(0);
  });

  it("Change building type marks Loan Details and Security Details to recheck", async () => {
    await service.createDip("uuid");
    await service.changeBuildingType("uuid", {
      BuildingType: "development",
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      LoanDetailsStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      SecurityDetailsStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      ValuationReportStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AdditionalInformationStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AssetsAndLiabilitiesStepName,
      RecheckStatus
    );

    expect(changePropertiesStatusMock).toHaveBeenCalledWith(
      CaseId,
      SecurityDetailsStepName,
      RecheckStatus
    );

    expect(changePropertiesStatusMock).toHaveBeenCalledWith(
      CaseId,
      ValuationReportStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toBeCalledTimes(5);
    expect(changePropertiesStatusMock).toBeCalledTimes(2);

    changeStepStatusMock.mockClear();
    changePropertiesStatusMock.mockClear();

    await service.changeBuildingType("uuid", {
      BuildingType: "development",
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(0);
    expect(changePropertiesStatusMock).toBeCalledTimes(0);

    await service.changeBuildingType("uuid", {
      BuildingType: "non_development",
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(5);
    expect(changePropertiesStatusMock).toBeCalledTimes(2);
  });

  it("Change securities marks security details and loan details to recheck", async () => {
    await service.createDip("uuid");

    const securitiesDetails = generateSecurityContent();
    await service.changeSecurities("uuid", securitiesDetails);
    await waitForHandlers();

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      LoanDetailsStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      SecurityDetailsStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      ValuationReportStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AdditionalInformationStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AssetsAndLiabilitiesStepName,
      RecheckStatus
    );

    expect(changePropertiesStatusMock).toHaveBeenCalledWith(
      CaseId,
      SecurityDetailsStepName,
      RecheckStatus
    );

    expect(changePropertiesStatusMock).toHaveBeenCalledWith(
      CaseId,
      ValuationReportStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toBeCalledTimes(5);
    expect(changePropertiesStatusMock).toBeCalledTimes(2);

    changeStepStatusMock.mockClear();
    changePropertiesStatusMock.mockClear();

    await service.changeSecurities("uuid", securitiesDetails);
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(0);
    expect(changePropertiesStatusMock).toBeCalledTimes(0);

    const otherSecuritiesDetails = generateSecurityContent();
    await service.changeSecurities("uuid", otherSecuritiesDetails);
    await waitForHandlers();

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      LoanDetailsStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      SecurityDetailsStepName,
      RecheckStatus
    );

    expect(changePropertiesStatusMock).toHaveBeenCalledWith(
      CaseId,
      ValuationReportStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AdditionalInformationStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AssetsAndLiabilitiesStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      ValuationReportStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      SecurityDetailsStepName,
      RecheckStatus
    );
    expect(changeStepStatusMock).toBeCalledTimes(5);
    expect(changePropertiesStatusMock).toBeCalledTimes(2);
  });

  it("Change loan details marks Loan Details to recheck", async () => {
    await service.createDip("uuid");
    await service.changeLoanDetails("uuid", {
      LoanType: "retained",
      LoanPurpose: "purchase",
      LoanTerm: 23,
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      LoanDetailsStepName,
      RecheckStatus
    );
    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AssetsAndLiabilitiesStepName,
      RecheckStatus
    );
    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AdditionalInformationStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toBeCalledTimes(3);
    changeStepStatusMock.mockClear();

    await service.changeLoanDetails("uuid", {
      LoanType: "retained",
      LoanPurpose: "purchase",
      LoanTerm: 23,
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(0);

    await service.changeLoanDetails("uuid", {
      LoanType: "rolled_up",
      LoanPurpose: "refinance",
      LoanTerm: 10,
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(3);
  });

  it("Change financial details marks Loan Details to recheck", async () => {
    await service.createDip("uuid");
    await service.changeFinancialDetails("uuid", {
      MaxLtvDayOne: 10,
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      LoanDetailsStepName,
      RecheckStatus
    );
    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AssetsAndLiabilitiesStepName,
      RecheckStatus
    );
    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AdditionalInformationStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toBeCalledTimes(3);
    changeStepStatusMock.mockClear();

    await service.changeFinancialDetails("uuid", {
      MaxLtvDayOne: 10,
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(0);

    await service.changeFinancialDetails("uuid", {
      MaxLtvDayOne: 10,
      BuildPeriodMonths: 23,
      FurtherDrawDowns: 1000,
      LtvToGdv: 54,
    });
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(3);
  });

  it("Change financial calculator details marks Loan Details to recheck", async () => {
    await service.createDip("uuid");

    const details = generateFinancialCalculatorDetails();
    await service.changeFinancialCalculatorDetails("uuid", details);
    await waitForHandlers();

    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      LoanDetailsStepName,
      RecheckStatus
    );
    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AssetsAndLiabilitiesStepName,
      RecheckStatus
    );
    expect(changeStepStatusMock).toHaveBeenCalledWith(
      CaseId,
      AdditionalInformationStepName,
      RecheckStatus
    );

    expect(changeStepStatusMock).toBeCalledTimes(3);
    changeStepStatusMock.mockClear();

    await service.changeFinancialCalculatorDetails("uuid", details);
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(0);

    const otherDetails = generateFinancialCalculatorDetails();

    await service.changeFinancialCalculatorDetails("uuid", otherDetails);
    await waitForHandlers();

    expect(changeStepStatusMock).toBeCalledTimes(3);
  });
});

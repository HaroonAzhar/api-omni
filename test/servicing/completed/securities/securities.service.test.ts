import { Test, TestingModule } from "@nestjs/testing";
import { CommandBus } from "@nestjs/cqrs";

import {
  CreateSecurityEntity,
  Security,
} from "../../../../src/v2/modules/cases/completed/securities/security.interface";
import {
  SecuritiesRepositoryInterface,
  SecuritiesService,
} from "../../../../src/v2/modules/cases/completed/securities/securities.service";
import { CompletedIdentificationService } from "../../../../src/v2/modules/cases/completed/completed-identification.service";
import { InMemoryRepository } from "../utils/in-memory-repository";
import { ApplicationService } from "../../../../src/v2/modules/cases/application/application.service";
import { CasesIdentificationService } from "../../../../src/v2/modules/cases/cases-identification.service";
import { SecurityNotesService } from "../../../../src/v2/modules/cases/completed/securities/security-notes/security-notes.service";
import { SecurityReleasesService } from "../../../../src/v2/modules/cases/completed/securities/security-releases/security-releases.service";
import { SecurityValuationsService } from "../../../../src/v2/modules/cases/completed/securities/security-valuations/security-valuations.service";
import {
  CreateSecurityValuation,
  SecurityValuation,
} from "../../../../src/v2/modules/cases/completed/securities/security-valuations/security-valuations.interface";
import { SecurityConversionsService } from "../../../../src/v2/modules/cases/completed/securities/security-conversions/security-conversions.service";
import { SecurityRelease } from "../../../../src/v2/modules/cases/completed/securities/security-releases/security-releases.interface";
import { SecurityConversion } from "../../../../src/v2/modules/cases/completed/securities/security-conversions/security-conversions.interface";

describe("SecuritiesService", () => {
  let service: SecuritiesService;

  const CompletedId = 10;
  const CasePropertyId = 11;

  const completedServiceStub = {
    getIdByCaseUuid: jest.fn(() => CompletedId),
  };

  const applicationServiceStub = {
    getProperty: jest.fn(() => ({ other: "found" })),
  };

  const valuations = [
    { GDV: 43.23, Valuation: 54.43 },
    { GDV: 23.43, Valuation: 1111.32 },
  ];
  const commandBusExecuteMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecuritiesService,
        {
          provide: SecuritiesRepositoryInterface,
          useFactory: () => new InMemoryRepository<Security>(),
        },
        {
          provide: CompletedIdentificationService,
          useValue: completedServiceStub,
        },
        {
          provide: ApplicationService,
          useValue: applicationServiceStub,
        },
        {
          provide: CasesIdentificationService,
          useValue: { getByCaseUuid: () => ({ CaseId: 1 }) },
        },
        {
          provide: SecurityNotesService,
          useValue: { getSecurityNotes: jest.fn().mockResolvedValue(["note"]) },
        },
        {
          provide: SecurityReleasesService,
          useValue: {
            getSecurityReleases: jest.fn().mockResolvedValue(["release"]),
          },
        },
        {
          provide: SecurityConversionsService,
          useValue: {
            getSecurityConversions: jest.fn().mockResolvedValue(["conversion"]),
          },
        },
        {
          provide: SecurityValuationsService,
          useValue: {
            getSecurityValuations: jest.fn().mockResolvedValue(valuations),
            createSecurityValuation: jest.fn(),
          },
        },
        {
          provide: CommandBus,
          useValue: { execute: commandBusExecuteMock },
        },
      ],
    }).compile();

    service = module.get<SecuritiesService>(SecuritiesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Returns security with property details, notes, releases", async () => {
    const uuid = "uuid";
    const security: CreateSecurityEntity = {
      FkCasePropertyId: CasePropertyId,
      FkCompletedId: CompletedId,
    };

    const valuationReport: CreateSecurityValuation = {
      Valuer: "foo",
      CreatedBy: "bar",
      GDV: 100,
      RecipientName: "name",
      ReportDate: "2020-12-28",
      Valuation: 200,
      ValuationDate: "2020-12-27",
      ValuationType: "Full Valuation",
    };
    await service.createSecurity(security, valuationReport);

    const matchingSecurities = await service.getSecurities(uuid);

    expect(matchingSecurities).toEqual([
      expect.objectContaining({
        ...security,
        FkCompletedId: CompletedId,
        property: { other: "found" },
        notes: ["note"],
        releases: ["release"],
        isReleased: true,
        conversions: ["conversion"],
        isConverted: true,
        valuations,
        currentGDV: undefined,
        currentValuation: undefined,
      }),
    ]);
  });

  describe("get current valuations", () => {
    it("no valuations", () => {
      const currentValuation = SecuritiesService.getCurrentValuation(
        [],
        [],
        []
      );

      expect(currentValuation).toEqual({});
    });

    it("single valuation", () => {
      const currentValuation = SecuritiesService.getCurrentValuation(
        [valuations[0] as SecurityValuation],
        [],
        []
      );

      expect(currentValuation).toEqual(valuations[0]);
    });

    it("multiple valuation", () => {
      const currentValuation = SecuritiesService.getCurrentValuation(
        valuations as SecurityValuation[],
        [],
        []
      );

      expect(currentValuation).toEqual(valuations[1]);
    });

    it("for released is empty", () => {
      const currentValuation = SecuritiesService.getCurrentValuation(
        valuations as SecurityValuation[],
        [("release" as unknown) as SecurityRelease],
        []
      );

      expect(currentValuation).toEqual({});
    });

    it("for converted is empty", () => {
      const currentValuation = SecuritiesService.getCurrentValuation(
        valuations as SecurityValuation[],
        [],
        [("conversion" as unknown) as SecurityConversion]
      );

      expect(currentValuation).toEqual({});
    });
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { CaseSummary } from "@v2/modules/cases/case-summary/case-summary.interface";
import {
  CaseSummaryRepositoryInterface,
  CaseSummaryService,
} from "@v2/modules/cases/case-summary/case-summary.service";
import { UnderwritersService } from "@v2/modules/admin/underwriters/underwriters.service";

import { CasesIdentificationService } from "../../../src/v2/modules/cases/cases-identification.service";
import { DipService } from "../../../src/v2/modules/cases/dip/dip.service";

class InMemoryRepository extends CaseSummaryRepositoryInterface {
  caseSummarys: CaseSummary[] = [];
  create(FkCaseId: number): Promise<number> {
    const CaseOverviewId = this.caseSummarys.length;
    this.caseSummarys.push({
      FkCaseId,
      Risk: "[]",
      Underwriter: 1,
      CaseOverviewId,
      ExpectedCompletionDate: "2021-08-23T00:00:00.000Z",
    });
    return new Promise((resolve) => resolve(CaseOverviewId));
  }
  getByCaseId(FkCaseId: number): Promise<CaseSummary> {
    return new Promise((resolve) =>
      resolve(
        this.caseSummarys.filter(
          (caseSummary) => caseSummary.FkCaseId === FkCaseId
        )[0]
      )
    );
  }
  update(FkCaseId: number, caseSummary: CaseSummary): Promise<void> {
    this.caseSummarys = this.caseSummarys.map((existing) => {
      if (existing.FkCaseId === FkCaseId) {
        return caseSummary;
      }
      return existing;
    });
    return Promise.resolve(null);
  }
  getByCompletionDateRange(
    dateMin: string,
    dateMax: string
  ): Promise<CaseSummary[]> {
    return new Promise((resolve) =>
      resolve(
        this.caseSummarys.filter(
          (caseSummary) =>
            caseSummary.ExpectedCompletionDate > dateMin &&
            caseSummary.ExpectedCompletionDate < dateMax
        )
      )
    );
  }
}

describe("CaseSummaryService", () => {
  let service: CaseSummaryService;

  const sampleUnderwriter = {
    Name: "Sample underwriter",
  };
  const repository = new InMemoryRepository();
  const getUnderwriterMock = jest.fn().mockResolvedValue(sampleUnderwriter);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CaseSummaryService,
        {
          provide: CaseSummaryRepositoryInterface,
          useValue: repository,
        },
        {
          provide: UnderwritersService,
          useValue: {
            getOne: getUnderwriterMock,
          },
        },
        {
          provide: DipService,
          useValue: jest.fn(),
        },
        {
          provide: CasesIdentificationService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CaseSummaryService>(CaseSummaryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Should return also underwriter using the service", async () => {
    const caseId = 1;
    const storedCaseSummary: CaseSummary = {
      FkCaseId: caseId,
      Underwriter: 1,
      Risk: '["foo"]',
      CaseOverviewId: 0,
      ExpectedCompletionDate: "2021-08-23T00:00:00.000Z",
    };

    repository.caseSummarys.push(storedCaseSummary);

    const expectedCaseSummary: Partial<CaseSummary> = {
      FkCaseId: caseId,
      underwriter: sampleUnderwriter,
    };

    const returnedCaseSummary = await service.getByCaseId(caseId);

    expect(returnedCaseSummary).toEqual(
      expect.objectContaining(expectedCaseSummary)
    );

    expect(getUnderwriterMock).toBeCalledWith(1);
  });

  it("Handles missing case summary", async () => {
    const caseId = 11;

    const returnedCaseSummary = await service.getByCaseId(caseId);

    expect(returnedCaseSummary).toBeUndefined();
  });

  it("Creates new case summary only if not exist", async () => {
    const caseId = 11;

    await service.createCaseSummary(caseId);
    const returnedCaseSummary = await service.getByCaseId(caseId);

    expect(returnedCaseSummary).toBeDefined();

    await service.createCaseSummary(caseId);
    const returnedCaseSummaryAfterRecreate = await service.getByCaseId(caseId);

    expect(returnedCaseSummaryAfterRecreate).toEqual(returnedCaseSummary);
  });
});

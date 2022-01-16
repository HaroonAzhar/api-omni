import { Test, TestingModule } from "@nestjs/testing";

import { Stage } from "./../../../src/v2/modules/cases/case.interface";
import { UsersService } from "../../../src/v2/modules/admin/users/users.service";
import { ApplicationService } from "../../../src/v2/modules/cases/application/application.service";
import { CaseSummaryService } from "../../../src/v2/modules/cases/case-summary/case-summary.service";
import { Case } from "../../../src/v2/modules/cases/case.interface";
import { CasesIdentificationService } from "../../../src/v2/modules/cases/cases-identification.service";
import {
  CaseRepositoryInterface,
  CasesService,
} from "../../../src/v2/modules/cases/cases.service";
import { CompletedIdentificationService } from "../../../src/v2/modules/cases/completed/completed-identification.service";
import { CompletedService } from "../../../src/v2/modules/cases/completed/completed.service";
import { DipService } from "../../../src/v2/modules/cases/dip/dip.service";
import { EnquiryService } from "../../../src/v2/modules/cases/enquiry/enquiry.service";
import { CrossCollateralisedLoansService } from "../../../src/v2/modules/cases/cross-collateralised-loans/cross-collateralised-loans.service";
import { ContactsService } from "../../../src/v2/modules/admin/contacts/contacts.service";
let currentStage: Stage;

class FakeRepository extends CaseRepositoryInterface {
  constructor(
    private readonly updateMock: (caseUuid: string, caseData: Case) => void,
    private readonly caseId: number
  ) {
    super();
  }
  async getAll(): Promise<Case[]> {
    return new Promise((resolve) => resolve([]));
  }
  async updateByCaseUuid(caseUuid: string, caseData: Case) {
    this.updateMock(caseUuid, caseData);
  }
  getByCaseUuid(): Promise<Case> {
    return new Promise((resolve) => {
      resolve({ CaseId: this.caseId, Stage: currentStage });
    });
  }
  async getCasesByBrokerId(brokerId: number): Promise<Case[]> {
    return new Promise((resolve) => resolve([]));
  }
}

describe("CasesService conversion", () => {
  let service: CasesService;

  const completedCreateMock = jest.fn();
  const completedServiceMock = {
    createCompleted: completedCreateMock,
  };
  const dipCreateMock = jest.fn();
  const dipServiceMock = {
    createFromEnquiry: dipCreateMock,
  };

  const caseSummaryCreateMock = jest.fn();
  const caseSummaryServiceMock = {
    createCaseSummary: caseSummaryCreateMock,
  };

  const updateMock = jest.fn();
  const caseId = 5;
  const fakeRepository = new FakeRepository(updateMock, caseId);

  const getEnquiryMock = jest
    .fn()
    .mockReturnValue({ Broker: "broker", FkOriginator: 1 });
  const enquiryServiceMock = {
    getEnquiry: getEnquiryMock,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CasesService,
        { provide: CaseRepositoryInterface, useValue: fakeRepository },
        { provide: CompletedService, useValue: completedServiceMock },
        { provide: DipService, useValue: dipServiceMock },
        { provide: EnquiryService, useValue: enquiryServiceMock },
        { provide: CasesIdentificationService, useValue: fakeRepository },
        { provide: CompletedIdentificationService, useValue: jest.fn() },
        { provide: ApplicationService, useValue: { getByCaseId: jest.fn() } },
        { provide: UsersService, useValue: jest.fn() },
        { provide: CaseSummaryService, useValue: caseSummaryServiceMock },
        { provide: CrossCollateralisedLoansService, useValue: jest.fn() },
        { provide: ContactsService, useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<CasesService>(CasesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Converts case to completed", async () => {
    const DateOfCompletion = "2020-10-26";
    const uuid = "uuid";
    await service.changeStage(uuid, { Stage: "completed", DateOfCompletion });

    expect(updateMock).toBeCalledWith(uuid, {
      Stage: "completed",
      Status: "in_progress",
    });
    expect(completedCreateMock).toBeCalledWith(
      {
        DateOfCompletion,
        FkCaseId: caseId,
      },
      { Trigger: "", User: "" }
    );
  });

  it("Reopen case to completed", async () => {
    const DateOfCompletion = "2020-10-26";
    const uuid = "uuid";
    currentStage = "redeemed";
    await service.changeStage(uuid, { Stage: "completed", DateOfCompletion });

    expect(updateMock).toBeCalledWith(uuid, {
      Stage: "completed",
      Status: "in_progress",
    });
    expect(completedCreateMock).toBeCalledTimes(0);
  });

  it("Converts case to dip", async () => {
    const uuid = "uuid";
    await service.changeStage(uuid, { Stage: "dip" });

    expect(updateMock).toHaveBeenNthCalledWith(1, uuid, {
      Stage: "dip",
      Status: "pending",
    });
    expect(updateMock).toHaveBeenNthCalledWith(2, uuid, { CaseNr: null });

    expect(dipCreateMock).toBeCalledWith(uuid, {
      Broker: "broker",
      FkOriginator: 1,
    });
  });

  it("Changes stage to enquiry", async () => {
    const uuid = "uuid";
    await service.changeStage(uuid, { Stage: "enquiry" });

    expect(updateMock).toHaveBeenNthCalledWith(1, uuid, {
      Stage: "enquiry",
    });
  });

  it("Changes stage to case summary", async () => {
    const uuid = "uuid";
    await service.changeStage(uuid, { Stage: "case_summary" });

    expect(updateMock).toHaveBeenNthCalledWith(1, uuid, {
      Stage: "case_summary",
    });

    expect(caseSummaryCreateMock).toBeCalledWith(caseId);
  });
});

import { Test, TestingModule } from "@nestjs/testing";

import { UsersService } from "../../../src/v2/modules/admin/users/users.service";
import { ApplicationService } from "../../../src/v2/modules/cases/application/application.service";
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
import { CaseSummaryService } from "../../../src/v2/modules/cases/case-summary/case-summary.service";
import { CrossCollateralisedLoansService } from "../../../src/v2/modules/cases/cross-collateralised-loans/cross-collateralised-loans.service";
import { ContactsService } from "../../../src/v2/modules/admin/contacts/contacts.service";

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
      resolve({ CaseId: this.caseId });
    });
  }

  async getCasesByBrokerId(brokerId: number): Promise<Case[]> {
    return new Promise((resolve) => resolve([]));
  }
}

describe("CasesService assign user", () => {
  let service: CasesService;

  const updateMock = jest.fn();
  const caseId = 5;
  const fakeRepository = new FakeRepository(updateMock, caseId);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CasesService,
        { provide: CaseRepositoryInterface, useValue: fakeRepository },
        { provide: CompletedService, useValue: jest.fn() },
        { provide: DipService, useValue: jest.fn() },
        { provide: EnquiryService, useValue: jest.fn() },
        { provide: CasesIdentificationService, useValue: jest.fn() },
        { provide: CompletedIdentificationService, useValue: jest.fn() },
        { provide: ApplicationService, useValue: jest.fn() },
        { provide: UsersService, useValue: jest.fn() },
        { provide: CaseSummaryService, useValue: jest.fn() },
        { provide: CrossCollateralisedLoansService, useValue: jest.fn() },
        { provide: ContactsService, useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<CasesService>(CasesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const uuid = "uuid";

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("Assigns case to a user", async () => {
    const UserId = 42;
    await service.assignCaseToUser(uuid, { UserId });

    expect(updateMock).toHaveBeenNthCalledWith(1, uuid, {
      FkAssignedUserId: UserId,
    });
  });

  it("Remove assigned user", async () => {
    await service.removeAssignedUser(uuid);

    expect(updateMock).toHaveBeenNthCalledWith(1, uuid, {
      FkAssignedUserId: null,
    });
  });
});

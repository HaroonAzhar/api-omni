import { Test, TestingModule } from "@nestjs/testing";

import { AdjustmentCorrection } from "../../../../src/v2/modules/cases/completed/adjustments/adjustment-corrections/adjustment-correction.interface";
import { AdjustmentCorrectionsService } from "../../../../src/v2/modules/cases/completed/adjustments/adjustment-corrections/adjustment-corrections.service";
import {
  Adjustment,
  CreateAdjustment,
} from "../../../../src/v2/modules/cases/completed/adjustments/adjustment.interface";
import {
  AdjustmentsRepositoryInterface,
  AdjustmentsService,
} from "../../../../src/v2/modules/cases/completed/adjustments/adjustments.service";
import { CompletedIdentificationService } from "../../../../src/v2/modules/cases/completed/completed-identification.service";
import { InMemoryRepository } from "../utils/in-memory-repository";

class AdjustmentCorrectionsServiceMock {
  corrections: AdjustmentCorrection[];
  constructor() {
    this.corrections = [];
  }

  async getAdjustmentCorrections() {
    return this.corrections;
  }

  async createAdjustmentCorrection(
    id: number,
    correction: AdjustmentCorrection
  ) {
    this.corrections.push(correction);
  }

  async cancelLastCorrection(id: number, context: { User: string }) {
    const last = this.corrections[this.corrections.length - 1];
    this.corrections.push({
      CorrectedAmount: -last.CorrectedAmount,
      Description: "Adjustment Cancellation",
      CreatedBy: context.User,
    });
  }
}
describe("AdjustmentsService", () => {
  let service: AdjustmentsService;

  const CompletedId = 10;
  const completedServiceStub = {
    getIdByCaseUuid: jest.fn(() => CompletedId),
  };

  let adjustmentCorrectionsService: AdjustmentCorrectionsServiceMock;

  beforeEach(async () => {
    adjustmentCorrectionsService = new AdjustmentCorrectionsServiceMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdjustmentsService,
        {
          provide: AdjustmentsRepositoryInterface,
          useFactory: () => new InMemoryRepository<Adjustment>(),
        },
        {
          provide: CompletedIdentificationService,
          useValue: completedServiceStub,
        },
        {
          provide: AdjustmentCorrectionsService,
          useValue: adjustmentCorrectionsService,
        },
      ],
    }).compile();

    service = module.get<AdjustmentsService>(AdjustmentsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Adds new adjustment with correct completed id", async () => {
    const uuid = "uuid";
    const adjustment: CreateAdjustment = {
      ActualDate: "ActualDate",
      Amount: 123,
      BalanceEffect: "Increase",
      TransactionType: "TransactionType",
    };
    await service.createAdjustment(uuid, adjustment);

    const matchingAdjustments = await service.getAdjustments(uuid);

    const { Amount, ...rest } = adjustment;
    expect(matchingAdjustments).toEqual([
      expect.objectContaining({
        ...rest,
        FkCompletedId: CompletedId,
        amount: Amount,
      }),
    ]);
  });

  it("Calculates corrected amount from collections", async () => {
    const uuid = "uuid";
    const adjustment: CreateAdjustment = {
      ActualDate: "ActualDate",
      Amount: 123,
      BalanceEffect: "Increase",
      TransactionType: "TransactionType",
    };
    await service.createAdjustment(uuid, adjustment);

    adjustmentCorrectionsService.corrections.push(
      { CorrectedAmount: -123, Description: "foo" },
      { CorrectedAmount: 256, Description: "bar" }
    );
    const matchingAdjustments = await service.getAdjustments(uuid);

    delete adjustment.Amount;

    expect(matchingAdjustments).toEqual([
      expect.objectContaining({
        ...adjustment,
        FkCompletedId: CompletedId,
        amount: 256,
      }),
    ]);
  });

  it("Sums all corrections", async () => {
    const uuid = "uuid";
    const adjustment: CreateAdjustment = {
      ActualDate: "ActualDate",
      Amount: 123,
      BalanceEffect: "Increase",
      TransactionType: "TransactionType",
    };
    await service.createAdjustment(uuid, adjustment);

    adjustmentCorrectionsService.corrections.push(
      { CorrectedAmount: 2, Description: "foo" },
      { CorrectedAmount: 1, Description: "foo" }
    );
    const matchingAdjustments = await service.getAdjustments(uuid);

    delete adjustment.Amount;
    expect(matchingAdjustments).toEqual([
      expect.objectContaining({
        ...adjustment,
        FkCompletedId: CompletedId,
        amount: 126,
      }),
    ]);
  });

  it("Cancel creates new correction", async () => {
    const uuid = "uuid";
    const adjustment: CreateAdjustment = {
      ActualDate: "ActualDate",
      Amount: 123,
      BalanceEffect: "Increase",
      TransactionType: "TransactionType",
    };
    const id = await service.createAdjustment(uuid, adjustment);

    await service.cancelAdjustment(id, { User: "foo", Trigger: "" });
    const matchingAdjustments = await service.getAdjustments(uuid);

    delete adjustment.Amount;

    expect(matchingAdjustments).toEqual([
      expect.objectContaining({
        ...adjustment,
        amount: 0,
        corrections: [
          {
            CorrectedAmount: 123,
            CreatedBy: "",
            Description: "Adjustment Initial",
          },
          {
            CorrectedAmount: -123,
            CreatedBy: "foo",
            Description: "Adjustment Cancellation",
          },
        ],
      }),
    ]);
  });
});

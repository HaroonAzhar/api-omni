import { CommandBus } from "@nestjs/cqrs";
import { Test, TestingModule } from "@nestjs/testing";

import { AdjustmentCorrection } from "../../../../src/v2/modules/cases/completed/adjustments/adjustment-corrections/adjustment-correction.interface";
import {
  AdjustmentCorrectionsService,
  AdjustmentCorrectionsRepositoryInterface,
} from "../../../../src/v2/modules/cases/completed/adjustments/adjustment-corrections/adjustment-corrections.service";

class InMemoryRepository implements AdjustmentCorrectionsRepositoryInterface {
  entities: AdjustmentCorrection[] = [];
  async create(entity: AdjustmentCorrection): Promise<number> {
    this.entities.push(entity);
    return this.entities.length - 1;
  }
  async findAll(): Promise<AdjustmentCorrection[]> {
    return this.entities;
  }
}

describe("AdjustmentCorrectionsService", () => {
  let service: AdjustmentCorrectionsService;

  const FkAdjustmentId = 0;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdjustmentCorrectionsService,
        {
          provide: AdjustmentCorrectionsRepositoryInterface,
          useClass: InMemoryRepository,
        },
        {
          provide: CommandBus,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AdjustmentCorrectionsService>(
      AdjustmentCorrectionsService
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Can add new one", async () => {
    const correction = {
      CorrectedAmount: 1,
      Description: "baz",
      CreatedBy: "foo",
    };
    await service.createAdjustmentCorrection(FkAdjustmentId, {
      CorrectedAmount: 1,
      Description: "baz",
      CreatedBy: "foo",
    });

    const corrections = await service.getAdjustmentCorrections(FkAdjustmentId);

    expect(corrections.length).toBe(1);
    expect(corrections[0]).toEqual({
      ...correction,
      FkAdjustmentId,
    });
  });

  it("New one cancel previous", async () => {
    const correction = {
      CorrectedAmount: 1,
      Description: "baz",
      CreatedBy: "foo",
    };
    await service.createAdjustmentCorrection(FkAdjustmentId, correction);

    const newCorrection = {
      CorrectedAmount: 2,
      Description: "baz",
      CreatedBy: "foo",
    };
    await service.createAdjustmentCorrection(FkAdjustmentId, newCorrection);

    const corrections = await service.getAdjustmentCorrections(FkAdjustmentId);

    expect(corrections.length).toBe(3);
    expect(corrections[1]).toEqual({
      Description: "Adjustment Cancellation replaced with correction",
      CreatedBy: "",
      CorrectedAmount: -1,
      FkAdjustmentId,
    });

    expect(corrections[2]).toEqual({
      ...newCorrection,
      FkAdjustmentId,
    });
  });

  it("Do not cancel cancellation", async () => {
    const correction = {
      CorrectedAmount: 1,
      Description: "baz",
      CreatedBy: "foo",
    };
    await service.createAdjustmentCorrection(FkAdjustmentId, correction);

    await service.cancelLastCorrection(FkAdjustmentId);
    const newCorrection = {
      CorrectedAmount: 2,
      Description: "baz",
      CreatedBy: "foo",
    };
    await service.createAdjustmentCorrection(FkAdjustmentId, newCorrection);

    const corrections = await service.getAdjustmentCorrections(FkAdjustmentId);

    expect(corrections.length).toBe(3);
    expect(corrections[1]).toEqual({
      Description: "Adjustment Cancellation ",
      CreatedBy: "",
      CorrectedAmount: -1,
      FkAdjustmentId,
    });

    expect(corrections[2]).toEqual({
      ...newCorrection,
      FkAdjustmentId,
    });
  });
});

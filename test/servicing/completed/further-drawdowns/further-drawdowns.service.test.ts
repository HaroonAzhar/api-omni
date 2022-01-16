import { Test, TestingModule } from "@nestjs/testing";
import { CommandBus, EventBus } from "@nestjs/cqrs";

import {
  CreateFurtherDrawdown,
  FurtherDrawdown,
} from "../../../../src/v2/modules/cases/completed/further-drawdowns/further-drawdown.interface";
import {
  FurtherDrawdownsService,
  FurtherDrawdownsRepositoryInterface,
} from "../../../../src/v2/modules/cases/completed/further-drawdowns/further-drawdowns.service";
import { CompletedIdentificationService } from "../../../../src/v2/modules/cases/completed/completed-identification.service";
import { InMemoryRepository } from "../utils/in-memory-repository";
import { EventsRepository } from "../../../../src/v2/utils/events";
import { Dip } from "../../../../src/v2/modules/cases/dip/dip.interface";
import { OriginationChecklistService } from "../../../../src/v2/modules/cases/completed/further/origination-checklist/origination-checklist.service";
import { UnderwriterFlowService } from "../../../../src/v2/modules/cases/completed/further/underwriter-flow/underwriter-flow.service";
import { DipService } from "../../../../src/v2/modules/cases/dip/dip.service";
import { CasesIdentificationService } from "../../../../src/v2/modules/cases/cases-identification.service";

describe("FurtherDrawdownsService", () => {
  let service: FurtherDrawdownsService;

  const CompletedId = 10;
  const getCompleted = jest.fn(() => ({
    CompletedId,
    DateOfCompletion: "2021-01-22",
  }));
  const completedServiceStub = {
    getIdByCaseUuid: jest.fn(() => CompletedId),
    getByCaseUuid: getCompleted,
    getById: getCompleted,
  };

  const originationChecklistMock = {
    createOriginationChecklist: jest.fn(),
    getOriginationChecklist: jest
      .fn()
      .mockResolvedValue("origination-checklist"),
  };

  const underwriterFlowMock = {
    createUnderwriterFlow: jest.fn(),
    getUnderwriterFlow: jest.fn().mockResolvedValue("underwriter-flow"),
  };
  const inMemoryRepository = new InMemoryRepository<FurtherDrawdown>();

  const commandBusExecuteMock = jest.fn();
  const context = {
    Trigger: "foo",
    User: "bar",
    Module: "further-drawdowns",
  };

  const getEventsMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FurtherDrawdownsService,
        {
          provide: FurtherDrawdownsRepositoryInterface,
          useValue: inMemoryRepository,
        },
        {
          provide: CompletedIdentificationService,
          useValue: completedServiceStub,
        },
        {
          provide: CommandBus,
          useValue: { execute: commandBusExecuteMock },
        },
        {
          provide: EventBus,
          useValue: jest.fn(),
        },
        {
          provide: EventsRepository,
          useValue: {
            getEvents: getEventsMock,
          },
        },
        {
          provide: OriginationChecklistService,
          useValue: originationChecklistMock,
        },
        {
          provide: UnderwriterFlowService,
          useValue: underwriterFlowMock,
        },
        {
          provide: DipService,
          useValue: {
            getByCaseId: jest
              .fn()
              .mockResolvedValue({ FurtherDrawDowns: 1000 }),
          },
        },
        {
          provide: CasesIdentificationService,
          useValue: {
            getByCaseUuid: jest.fn().mockResolvedValue({ CaseId: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<FurtherDrawdownsService>(FurtherDrawdownsService);
    inMemoryRepository.entities = [];
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Adds new furhterDrawdown with correct completed id", async () => {
    const uuid = "uuid";
    const furhterDrawdown: CreateFurtherDrawdown = {
      RequestedAmount: 1000,
      CumulativeBalance: 100,
      LTGDV: 0.8,
      LTV: 0.9,
      TotalGDV: 2000,
      TotalValuations: 1500,
      Notes: "foo",
      CreatedBy: "bar",
      RequestedDate: "2021-03-22",
    };

    await service.createFurtherDrawdown(uuid, furhterDrawdown, context);

    const matchingFurtherDrawdowns = await service.getFurtherDrawdowns(uuid);

    expect(matchingFurtherDrawdowns).toEqual([
      expect.objectContaining({
        ...furhterDrawdown,
        FkCompletedId: CompletedId,
      }),
    ]);
    expect(commandBusExecuteMock).toBeCalledWith(
      expect.objectContaining({
        context: {
          ...context,
          Name: "CreateFurtherDrawdownCommand",
        },
      })
    );
  });

  it("Adds creates origination checklist", async () => {
    const uuid = "uuid";
    const furhterDrawdown: CreateFurtherDrawdown = {
      RequestedAmount: 1000,
      CumulativeBalance: 100,
      LTGDV: 0.8,
      LTV: 0.9,
      TotalGDV: 2000,
      TotalValuations: 1500,
      Notes: "foo",
      CreatedBy: "bar",
      RequestedDate: "2021-03-22",
    };

    await service.createFurtherDrawdown(uuid, furhterDrawdown, context);

    const matchingFurtherDrawdowns = await service.getFurtherDrawdowns(uuid);

    expect(matchingFurtherDrawdowns[0].originationChecklist).toBe(
      "origination-checklist"
    );
    expect(originationChecklistMock.createOriginationChecklist).toBeCalledWith(
      0,
      "furtherDrawdowns"
    );
  });

  it("Adds creates underwriter flow", async () => {
    const uuid = "uuid";
    const furhterDrawdown: CreateFurtherDrawdown = {
      RequestedAmount: 1000,
      CumulativeBalance: 100,
      LTGDV: 0.8,
      LTV: 0.9,
      TotalGDV: 2000,
      TotalValuations: 1500,
      Notes: "foo",
      CreatedBy: "bar",
      RequestedDate: "2021-03-22",
    };

    await service.createFurtherDrawdown(uuid, furhterDrawdown, context);

    const matchingFurtherDrawdowns = await service.getFurtherDrawdowns(uuid);

    expect(matchingFurtherDrawdowns[0].underwriterFlow).toBe(
      "underwriter-flow"
    );
    expect(originationChecklistMock.createOriginationChecklist).toBeCalledWith(
      0,
      "furtherDrawdowns"
    );
  });
  it("getAvailableDrawdownFunds", () => {
    const availableAmount = FurtherDrawdownsService.getAvailableDrawdownFunds(
      [
        {
          RequestedAmount: 100,
        },
        {
          RequestedAmount: 200,
        },
      ] as FurtherDrawdown[],
      { FurtherDrawDowns: 1000 } as Dip
    );
    expect(availableAmount).toBe(700);
  });

  it("getAvailableDrawdownFunds empty dip", () => {
    const availableAmount = FurtherDrawdownsService.getAvailableDrawdownFunds(
      [
        {
          RequestedAmount: 100,
        },
        {
          RequestedAmount: 200,
        },
      ] as FurtherDrawdown[],
      undefined as Dip
    );
    expect(availableAmount).toBe(0);
  });

  it("Fills remaining drawdowns", async () => {
    const uuid = "uuid";
    const furhterDrawdown: CreateFurtherDrawdown = {
      RequestedAmount: 1,
      CumulativeBalance: 100,
      LTGDV: 0.8,
      LTV: 0.9,
      TotalGDV: 2000,
      TotalValuations: 1500,
      Notes: "foo",
      CreatedBy: "bar",
      RequestedDate: "2021-03-22",
    };

    await service.createFurtherDrawdown(uuid, furhterDrawdown);

    const furhterDrawdownLater: CreateFurtherDrawdown = {
      RequestedAmount: 100,
      CumulativeBalance: 100,
      LTGDV: 0.8,
      LTV: 0.9,
      TotalGDV: 2000,
      TotalValuations: 1500,
      Notes: "foo",
      CreatedBy: "bar",
      RequestedDate: "2021-03-23",
    };

    await service.createFurtherDrawdown(uuid, furhterDrawdownLater);

    const matchingFurtherDrawdowns = await service.getFurtherDrawdowns(uuid);

    expect(matchingFurtherDrawdowns[0].remainingFunds).toBe(999);
    expect(matchingFurtherDrawdowns[1].remainingFunds).toBe(899);
  });
});

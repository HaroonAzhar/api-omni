import { Test, TestingModule } from "@nestjs/testing";
import { CommandBus, EventBus } from "@nestjs/cqrs";

import {
  CreateFurtherAdvance,
  FurtherAdvance,
} from "../../../../src/v2/modules/cases/completed/further-advances/further-advance.interface";
import {
  FurtherAdvancesService,
  FurtherAdvancesRepositoryInterface,
} from "../../../../src/v2/modules/cases/completed/further-advances/further-advances.service";
import { CompletedIdentificationService } from "../../../../src/v2/modules/cases/completed/completed-identification.service";
import { InMemoryRepository } from "../utils/in-memory-repository";
import { EventsRepository } from "../../../../src/v2/utils/events";
import { OriginationChecklistService } from "../../../../src/v2/modules/cases/completed/further/origination-checklist/origination-checklist.service";
import { UnderwriterFlowService } from "../../../../src/v2/modules/cases/completed/further/underwriter-flow/underwriter-flow.service";
import { DipService } from "../../../../src/v2/modules/cases/dip/dip.service";
import { CasesIdentificationService } from "../../../../src/v2/modules/cases/cases-identification.service";

describe("FurtherAdvancesService", () => {
  let service: FurtherAdvancesService;

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
  const inMemoryRepository = new InMemoryRepository<FurtherAdvance>();

  const commandBusExecuteMock = jest.fn();
  const context = {
    Trigger: "foo",
    User: "bar",
    Module: "further-advances",
  };

  const getEventsMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FurtherAdvancesService,
        {
          provide: FurtherAdvancesRepositoryInterface,
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

    service = module.get<FurtherAdvancesService>(FurtherAdvancesService);
    inMemoryRepository.entities = [];
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Adds new furhterAdvance with correct completed id", async () => {
    const uuid = "uuid";
    const furhterAdvance: CreateFurtherAdvance = {
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

    await service.createFurtherAdvance(uuid, furhterAdvance, context);

    const matchingFurtherAdvances = await service.getFurtherAdvances(uuid);

    expect(matchingFurtherAdvances).toEqual([
      expect.objectContaining({
        ...furhterAdvance,
        FkCompletedId: CompletedId,
      }),
    ]);
    expect(commandBusExecuteMock).toBeCalledWith(
      expect.objectContaining({
        context: {
          ...context,
          Name: "CreateFurtherAdvanceCommand",
        },
      })
    );
  });

  it("Adds creates origination checklist", async () => {
    const uuid = "uuid";
    const furhterAdvance: CreateFurtherAdvance = {
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

    await service.createFurtherAdvance(uuid, furhterAdvance, context);

    const matchingFurtherAdvances = await service.getFurtherAdvances(uuid);

    expect(matchingFurtherAdvances[0].originationChecklist).toBe(
      "origination-checklist"
    );
    expect(originationChecklistMock.createOriginationChecklist).toBeCalledWith(
      0,
      "furtherAdvances"
    );
  });

  it("Adds creates underwriter flow", async () => {
    const uuid = "uuid";
    const furhterAdvance: CreateFurtherAdvance = {
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

    await service.createFurtherAdvance(uuid, furhterAdvance, context);

    const matchingFurtherAdvances = await service.getFurtherAdvances(uuid);

    expect(matchingFurtherAdvances[0].underwriterFlow).toBe("underwriter-flow");
    expect(originationChecklistMock.createOriginationChecklist).toBeCalledWith(
      0,
      "furtherAdvances"
    );
  });
});

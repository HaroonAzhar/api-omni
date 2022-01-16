import { Test, TestingModule } from "@nestjs/testing";
import { CommandBus, EventBus } from "@nestjs/cqrs";

import { Cashflow } from "../../../../src/v2/modules/cases/completed/cashflows/cashflow.interface";
import {
  CashflowsService,
  CashflowsRepositoryInterface,
} from "../../../../src/v2/modules/cases/completed/cashflows/cashflows.service";
import { CompletedIdentificationService } from "../../../../src/v2/modules/cases/completed/completed-identification.service";
import { InMemoryRepository } from "../utils/in-memory-repository";
import { EventsRepository } from "../../../../src/v2/utils/events";

describe("CashflowsService", () => {
  let service: CashflowsService;

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
  const inMemoryRepository = new InMemoryRepository<Cashflow>();

  const commandBusExecuteMock = jest.fn();
  const context = {
    Trigger: "foo",
    User: "bar",
    Module: "cashflows",
  };

  const getEventsMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CashflowsService,
        {
          provide: CashflowsRepositoryInterface,
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
      ],
    }).compile();

    service = module.get<CashflowsService>(CashflowsService);
    inMemoryRepository.entities = [];
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Adds new cashflow with correct completed id", async () => {
    const uuid = "uuid";
    const cashflow = {
      Amount: 1000,
      Description: "foo",
      CreatedBy: "bar",
      ActualDate: "2021-03-22",
    };

    await service.createCashflow(uuid, cashflow, context);

    const matchingCashflows = await service.getCashflows(uuid);

    expect(matchingCashflows).toEqual([
      expect.objectContaining({ ...cashflow, FkCompletedId: CompletedId }),
    ]);
    expect(commandBusExecuteMock).toBeCalledWith({
      content: expect.objectContaining({
        ...cashflow,
        FkCompletedId: CompletedId,
      }),
      context: {
        ...context,
        Name: "CreateCashflowCommand",
      },
    });
  });
});

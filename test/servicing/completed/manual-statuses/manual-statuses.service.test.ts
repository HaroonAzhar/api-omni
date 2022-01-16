import { Test, TestingModule } from "@nestjs/testing";
import { CommandBus, EventBus } from "@nestjs/cqrs";

import {
  ManualStatus,
  ManualStatusesRepositoryInterface,
} from "../../../../src/v2/modules/cases/completed/manual-statuses/manual-status.interface";
import { ManualStatusesService } from "../../../../src/v2/modules/cases/completed/manual-statuses/manual-statuses.service";
import { CompletedIdentificationService } from "../../../../src/v2/modules/cases/completed/completed-identification.service";
import { InMemoryRepository } from "../utils/in-memory-repository";
import { EventsRepository } from "../../../../src/v2/utils/events";

describe("ManualStatusesService", () => {
  let service: ManualStatusesService;

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
  const inMemoryRepository = new InMemoryRepository<ManualStatus>();

  const commandBusExecuteMock = jest.fn();
  const context = {
    Trigger: "foo",
    User: "bar",
    Module: "manual-statuses",
  };

  const getEventsMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManualStatusesService,
        {
          provide: ManualStatusesRepositoryInterface,
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

    service = module.get<ManualStatusesService>(ManualStatusesService);
    inMemoryRepository.entities = [];
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Adds new manualStatus with correct completed id", async () => {
    const uuid = "uuid";
    const manualStatus: ManualStatus = {
      Status: "Non-Performing – Delinquent",
      EffectiveFrom: "2021-01-22",
    };

    await service.createManualStatus(uuid, manualStatus, context);

    const matchingManualStatuses = await service.getManualStatuses(uuid);

    expect(matchingManualStatuses).toEqual([
      expect.objectContaining({ ...manualStatus, FkCompletedId: CompletedId }),
    ]);
    expect(commandBusExecuteMock).toBeCalledWith({
      content: expect.objectContaining({
        ...manualStatus,
        FkCompletedId: CompletedId,
      }),
      context: {
        ...context,
        Name: "CreateManualStatusCommand",
      },
    });
  });

  it("Can not create manualStatus before completion date", async () => {
    const uuid = "uuid";
    const manualStatus: ManualStatus = {
      Status: "Non-Performing – Arrears",
      EffectiveFrom: "2021-01-21",
    };

    const result = await service.createManualStatus(
      uuid,
      manualStatus,
      context
    );

    const matchingManualStatuses = await service.getManualStatuses(uuid);

    expect(matchingManualStatuses).toEqual([]);
    expect(commandBusExecuteMock).toBeCalledTimes(0);
    expect(result instanceof Error).toBe(true);
  });

  it("Can not create manualStatus before existing", async () => {
    const uuid = "uuid";
    const manualStatus: ManualStatus = {
      Status: "Non-Performing – Arrears",
      EffectiveFrom: "2021-01-24",
    };
    const beforeManualStatus: ManualStatus = {
      Status: "Non-Performing – Delinquent",
      EffectiveFrom: "2021-01-23",
    };
    await service.createManualStatus(uuid, manualStatus, context);

    const result = await service.createManualStatus(
      uuid,
      beforeManualStatus,
      context
    );

    const matchingManualStatuses = await service.getManualStatuses(uuid);

    expect(matchingManualStatuses).toEqual([
      expect.objectContaining({ ...manualStatus, FkCompletedId: CompletedId }),
    ]);
    expect(commandBusExecuteMock).toBeCalledTimes(1);
    expect(result instanceof Error).toBe(true);
  });

  it("Sort by effective from desc", async () => {
    const manualStatuses: ManualStatus[] = [
      {
        Status: "Non-Performing – Delinquent",
        EffectiveFrom: "2020-01-25",
      },
      {
        Status: "Non-Performing – Arrears",
        EffectiveFrom: "2021-01-24",
      },
      {
        Status: "Non-Performing – Delinquent",
        EffectiveFrom: "2021-01-23",
      },
    ];

    const sorted = ManualStatusesService.sortByEffectiveFrom(manualStatuses);

    expect(sorted).toEqual([
      {
        Status: "Non-Performing – Arrears",
        EffectiveFrom: "2021-01-24",
      },
      {
        Status: "Non-Performing – Delinquent",
        EffectiveFrom: "2021-01-23",
      },
      {
        Status: "Non-Performing – Delinquent",
        EffectiveFrom: "2020-01-25",
      },
    ]);
  });

  it("Deletes by updating IsDeleted", async () => {
    const uuid = "uuid";
    const manualStatus: ManualStatus = {
      Status: "Non-Performing – Arrears",
      EffectiveFrom: "2021-01-24",
    };

    const created = (await service.createManualStatus(
      uuid,
      manualStatus
    )) as ManualStatus;

    await service.deleteManualStatus(uuid, created.ManualStatusId, context);

    expect(
      (await inMemoryRepository.get(CompletedId, created.ManualStatusId))
        .IsDeleted
    ).toBe(true);

    expect(commandBusExecuteMock).toBeCalledWith({
      content: {
        ManualStatusId: created.ManualStatusId,
      },
      context: {
        ...context,
        Name: "DeleteManualStatusCommand",
      },
    });
  });

  it("Only returns non deleted", async () => {
    const uuid = "uuid";
    const manualStatus: ManualStatus = {
      Status: "Non-Performing – Arrears",
      EffectiveFrom: "2021-01-24",
    };

    const created = (await service.createManualStatus(
      uuid,
      manualStatus
    )) as ManualStatus;

    await service.deleteManualStatus(uuid, created.ManualStatusId, context);

    expect(await service.getManualStatuses(uuid)).toEqual([]);
  });

  it("Returns historical events", async () => {
    const uuid = "uuid";

    getEventsMock.mockImplementation((eventName) => {
      if (eventName === "DeletedManualStatusEvent") {
        return Promise.resolve([
          {
            content: {
              FkCompletedId: CompletedId,
              ManualStatusId: 2,
            },
          },
          {
            content: {
              FkCompletedId: CompletedId,
              ManualStatusId: 3,
            },
          },
        ]);
      } else {
        return Promise.resolve([
          {
            content: {
              FkCompletedId: -CompletedId,
            },
          },
          {
            content: {
              FkCompletedId: CompletedId,
              ManualStatusId: 1,
            },
          },
          {
            content: {
              FkCompletedId: CompletedId,
              ManualStatusId: 2,
            },
          },
        ]);
      }
    });
    const date = "2021-01.23";
    const historicalEvents = await service.getManualStatusesHistorical(
      uuid,
      date
    );

    expect(getEventsMock).toBeCalledTimes(2);
    expect(getEventsMock.mock.calls).toEqual([
      ["CreatedManualStatusEvent", "manual-statuses", date],
      ["DeletedManualStatusEvent", "manual-statuses", date],
    ]);

    expect(historicalEvents).toEqual([
      {
        FkCompletedId: CompletedId,
        ManualStatusId: 1,
      },
    ]);
  });

  it("Can get last status", async () => {
    const uuid = "uuid";
    const manualStatus: ManualStatus = {
      Status: "Non-Performing – Arrears",
      EffectiveFrom: "2021-01-24",
    };
    const beforeManualStatus: ManualStatus = {
      Status: "Non-Performing – Delinquent",
      EffectiveFrom: "2021-01-23",
    };
    await service.createManualStatus(uuid, beforeManualStatus, context);
    await service.createManualStatus(uuid, manualStatus, context);

    const lastStatus = await service.getLastStatus(CompletedId);
    expect(lastStatus).toEqual(expect.objectContaining(manualStatus));
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { CommandBus, EventBus } from "@nestjs/cqrs";

import {
  DefaultEvent,
  DefaultEventsRepositoryInterface,
} from "../../../../src/v2/modules/cases/completed/default-events/default-event.interface";
import { DefaultEventsService } from "../../../../src/v2/modules/cases/completed/default-events/default-events.service";
import { CompletedIdentificationService } from "../../../../src/v2/modules/cases/completed/completed-identification.service";
import { InMemoryRepository } from "../utils/in-memory-repository";
import { EventsRepository } from "../../../../src/v2/utils/events";

describe("DefaultEventsService", () => {
  let service: DefaultEventsService;

  const CompletedId = 10;
  const completedServiceStub = {
    getIdByCaseUuid: jest.fn(() => CompletedId),
  };
  const inMemoryRepository = new InMemoryRepository<DefaultEvent>();

  const commandBusExecuteMock = jest.fn();
  const context = {
    Trigger: "foo",
    User: "bar",
    Module: "default-events",
  };

  const getEventsMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DefaultEventsService,
        {
          provide: DefaultEventsRepositoryInterface,
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

    service = module.get<DefaultEventsService>(DefaultEventsService);
    inMemoryRepository.entities = [];
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Adds new defaultEvent with correct completed id", async () => {
    const uuid = "uuid";
    const defaultEvent: DefaultEvent = { Type: "Start", Date: "2021-01-22" };

    await service.createDefaultEvent(uuid, defaultEvent, context);

    const matchingDefaultEvents = await service.getDefaultEvents(uuid);

    expect(matchingDefaultEvents).toEqual([
      expect.objectContaining({ ...defaultEvent, FkCompletedId: CompletedId }),
    ]);
    expect(commandBusExecuteMock).toBeCalledWith({
      content: expect.objectContaining({
        ...defaultEvent,
        FkCompletedId: CompletedId,
      }),
      context: {
        ...context,
        Name: "CreateDefaultEventCommand",
      },
    });
  });

  it("Deletes by updating IsDeleted", async () => {
    const uuid = "uuid";
    const defaultEvent: DefaultEvent = { Type: "Start", Date: "2021-01-22" };

    const created = (await service.createDefaultEvent(
      uuid,
      defaultEvent
    )) as DefaultEvent;

    await service.deleteDefaultEvent(uuid, created.DefaultEventId, context);

    expect(
      (await inMemoryRepository.get(CompletedId, created.DefaultEventId))
        .IsDeleted
    ).toBe(true);

    expect(commandBusExecuteMock).toBeCalledWith({
      content: {
        DefaultEventId: created.DefaultEventId,
      },
      context: {
        ...context,
        Name: "DeleteDefaultEventCommand",
      },
    });
  });

  it("Only returns non deleted defaultEvents", async () => {
    const uuid = "uuid";
    const defaultEvent: DefaultEvent = { Type: "Start", Date: "2021-01-22" };

    const created = (await service.createDefaultEvent(
      uuid,
      defaultEvent
    )) as DefaultEvent;

    await service.deleteDefaultEvent(uuid, created.DefaultEventId);

    expect(await service.getDefaultEvents(uuid)).toEqual([]);
  });

  it("Returns historical events", async () => {
    const uuid = "uuid";

    getEventsMock.mockImplementation((eventName) => {
      if (eventName === "DeletedDefaultEventEvent") {
        return Promise.resolve([
          {
            content: {
              FkCompletedId: CompletedId,
              DefaultEventId: 2,
            },
          },
          {
            content: {
              FkCompletedId: CompletedId,
              DefaultEventId: 3,
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
              DefaultEventId: 1,
            },
          },
          {
            content: {
              FkCompletedId: CompletedId,
              DefaultEventId: 2,
            },
          },
        ]);
      }
    });
    const date = "2021-01.23";
    const historicalEvents = await service.getDefaultEventsHistorical(
      uuid,
      date
    );

    expect(getEventsMock).toBeCalledTimes(2);
    expect(getEventsMock.mock.calls).toEqual([
      ["CreatedDefaultEventEvent", "default-events", date],
      ["DeletedDefaultEventEvent", "default-events", date],
    ]);

    expect(historicalEvents).toEqual([
      {
        FkCompletedId: CompletedId,
        DefaultEventId: 1,
      },
    ]);
  });

  it("Can not create 2 events at the same day", async () => {
    const uuid = "uuid";
    const defaultEvent: DefaultEvent = { Type: "Start", Date: "2021-01-22" };
    const otherDefaultEvent: DefaultEvent = {
      Type: "End",
      Date: "2021-01-22",
    };
    await service.createDefaultEvent(uuid, defaultEvent, context);
    await service.createDefaultEvent(uuid, otherDefaultEvent, context);

    const matchingDefaultEvents = await service.getDefaultEvents(uuid);

    expect(matchingDefaultEvents).toEqual([
      expect.objectContaining({ ...defaultEvent, FkCompletedId: CompletedId }),
    ]);
    expect(commandBusExecuteMock).toBeCalledWith({
      content: expect.objectContaining({
        ...defaultEvent,
        FkCompletedId: CompletedId,
      }),
      context: {
        ...context,
        Name: "CreateDefaultEventCommand",
      },
    });
  });

  it("Can create 2 events at different day", async () => {
    const uuid = "uuid";
    const defaultEvent: DefaultEvent = { Type: "Start", Date: "2021-01-22" };
    const otherDefaultEvent: DefaultEvent = {
      Type: "Start",
      Date: "21/01/2021",
    };

    await service.createDefaultEvent(uuid, defaultEvent);

    await service.createDefaultEvent(uuid, otherDefaultEvent);

    const matchingDefaultEvents = await service.getDefaultEvents(uuid);

    expect(matchingDefaultEvents).toEqual([
      expect.objectContaining({
        ...defaultEvent,
        FkCompletedId: CompletedId,
      }),
      expect.objectContaining({
        ...otherDefaultEvent,
        FkCompletedId: CompletedId,
      }),
    ]);
    expect(commandBusExecuteMock).toBeCalledTimes(2);
  });

  it("Returns Periods", async () => {
    const uuid = "uuid";

    getEventsMock.mockImplementation((eventName) => {
      if (eventName === "DeletedDefaultEventEvent") {
        return Promise.resolve([]);
      } else {
        return Promise.resolve([
          {
            content: {
              FkCompletedId: -CompletedId,
              Type: "Start",
              Date: "2021.01.01",
            },
          },
          {
            content: {
              FkCompletedId: CompletedId,
              DefaultEventId: 1,
              Type: "End",
              Date: "2021.01.02",
            },
          },
          {
            content: {
              FkCompletedId: CompletedId,
              DefaultEventId: 2,
              Type: "Start",
              Date: "2021.01.03",
            },
          },
          {
            content: {
              FkCompletedId: CompletedId,
              DefaultEventId: 3,
              Type: "End",
              Date: "2021.01.04",
            },
          },
          {
            content: {
              FkCompletedId: CompletedId,
              DefaultEventId: 4,
              Type: "End",
              Date: "2021.01.05",
            },
          },
          {
            content: {
              FkCompletedId: CompletedId,
              DefaultEventId: 5,
              Type: "Start",
              Date: "2021.01.06",
            },
          },
          {
            content: {
              FkCompletedId: CompletedId,
              DefaultEventId: 6,
              Type: "Start",
              Date: "2021.01.07",
            },
          },
        ]);
      }
    });
    const date = "2021-01-23";
    const periods = await service.getDefaultEventsPeriods(uuid, date);

    expect(periods).toEqual([
      {
        start_from: "2021.01.03",
        to: "2021.01.04",
      },
      {
        start_from: "2021.01.06",
      },
    ]);
  });
});

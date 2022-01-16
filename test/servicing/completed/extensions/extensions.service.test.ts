import { Test, TestingModule } from "@nestjs/testing";
import { CommandBus, EventBus } from "@nestjs/cqrs";

import {
  Extension,
  ExtensionsRepositoryInterface,
} from "../../../../src/v2/modules/cases/completed/extensions/extension.interface";
import { ExtensionsService } from "../../../../src/v2/modules/cases/completed/extensions/extensions.service";
import { CompletedIdentificationService } from "../../../../src/v2/modules/cases/completed/completed-identification.service";
import { InMemoryRepository } from "../utils/in-memory-repository";
import { EventsRepository } from "../../../../src/v2/utils/events";

describe("ExtensionsService", () => {
  let service: ExtensionsService;

  const CompletedId = 10;
  const completedServiceStub = {
    getIdByCaseUuid: jest.fn(() => CompletedId),
    getById: jest.fn(() => ({
      CompletedId,
      DateOfMaturity: "2021-01-20",
    })),
  };
  const inMemoryRepository = new InMemoryRepository<Extension>();

  const commandBusExecuteMock = jest.fn();
  const context = {
    Trigger: "foo",
    User: "bar",
    Module: "extensions",
  };

  const getEventsMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExtensionsService,
        {
          provide: ExtensionsRepositoryInterface,
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

    service = module.get<ExtensionsService>(ExtensionsService);
    inMemoryRepository.entities = [];
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Adds new extension with correct completed id", async () => {
    const uuid = "uuid";
    const extension: Extension = { InterestRate: 1.1, Date: "2021-01-22" };

    await service.createExtension(uuid, extension, context);

    const matchingExtensions = await service.getExtensions(uuid);

    expect(matchingExtensions).toEqual([
      expect.objectContaining({ ...extension, FkCompletedId: CompletedId }),
    ]);
    expect(commandBusExecuteMock).toBeCalledWith({
      content: expect.objectContaining({
        ...extension,
        FkCompletedId: CompletedId,
      }),
      context: {
        ...context,
        Name: "CreateExtensionCommand",
      },
    });
  });

  it("Can not create extension before maturity date", async () => {
    const uuid = "uuid";
    const extension: Extension = { InterestRate: 1.1, Date: "2021-01-20" };

    const result = await service.createExtension(uuid, extension, context);

    const matchingExtensions = await service.getExtensions(uuid);

    expect(matchingExtensions).toEqual([]);
    expect(commandBusExecuteMock).toBeCalledTimes(0);
    expect(result instanceof Error).toBe(true);
  });

  it("Returns historical extensions", async () => {
    const uuid = "uuid";

    getEventsMock.mockImplementation(() => {
      return Promise.resolve([
        {
          content: {
            FkCompletedId: -CompletedId,
          },
        },
        {
          content: {
            FkCompletedId: CompletedId,
            ExtensionId: 1,
          },
        },
        {
          content: {
            FkCompletedId: CompletedId,
            ExtensionId: 2,
          },
        },
      ]);
    });
    const date = "2021-01.23";
    const historicalEvents = await service.getExtensionsHistorical(uuid, date);

    expect(getEventsMock).toBeCalledTimes(1);
    expect(getEventsMock.mock.calls).toEqual([
      ["CreatedExtensionEvent", "extensions", date],
    ]);

    expect(historicalEvents).toEqual([
      {
        FkCompletedId: CompletedId,
        ExtensionId: 1,
      },
      {
        FkCompletedId: CompletedId,
        ExtensionId: 2,
      },
    ]);
  });

  it("Can not create 2 extension before last one", async () => {
    const uuid = "uuid";
    const extension: Extension = { InterestRate: 1.1, Date: "2021-01-22" };
    const otherExtension: Extension = {
      InterestRate: 1.1,
      Date: "2021-01-21",
    };
    await service.createExtension(uuid, extension, context);
    const result = await service.createExtension(uuid, otherExtension, context);

    const matchingExtensions = await service.getExtensions(uuid);

    expect(matchingExtensions).toEqual([
      expect.objectContaining({ ...extension, FkCompletedId: CompletedId }),
    ]);
    expect(commandBusExecuteMock).toBeCalledWith({
      content: expect.objectContaining({
        ...extension,
        FkCompletedId: CompletedId,
      }),
      context: {
        ...context,
        Name: "CreateExtensionCommand",
      },
    });
    expect(result instanceof Error).toBe(true);
  });

  it("Can further extend extensions", async () => {
    const uuid = "uuid";
    const extension: Extension = { InterestRate: 1.1, Date: "2021-01-22" };
    const otherExtension: Extension = {
      InterestRate: 1.1,
      Date: "2021-01-23",
    };

    await service.createExtension(uuid, extension);

    await service.createExtension(uuid, otherExtension);

    const matchingExtensions = await service.getExtensions(uuid);

    expect(matchingExtensions).toEqual([
      expect.objectContaining({
        ...extension,
        FkCompletedId: CompletedId,
      }),
      expect.objectContaining({
        ...otherExtension,
        FkCompletedId: CompletedId,
      }),
    ]);
    expect(commandBusExecuteMock).toBeCalledTimes(2);
  });

  it("Returns current Maturity date if no extension", async () => {
    const maturityDate = await service.getCurrentMaturityDate(CompletedId);

    expect(maturityDate).toBe("2021-01-20");
  });

  it("Returns current Maturity date as last extension date", async () => {
    const uuid = "uuid";

    const extension: Extension = { InterestRate: 1.1, Date: "2021-01-22" };
    const otherExtension: Extension = {
      InterestRate: 1.1,
      Date: "2021-01-23",
    };

    await service.createExtension(uuid, extension);

    await service.createExtension(uuid, otherExtension);

    const maturityDate = await service.getCurrentMaturityDate(CompletedId);

    expect(maturityDate).toBe("2021-01-23");
  });

  it("Returns correct interest rate", async () => {
    const uuid = "uuid";

    const extension: Extension = { InterestRate: 1.1, Date: "2021-01-22" };
    const otherExtension: Extension = {
      InterestRate: 2.1,
      Date: "2021-02-22",
    };

    await service.createExtension(uuid, extension);

    await service.createExtension(uuid, otherExtension);

    const existingExtensions = await service.getExtensions(uuid);

    const interestRate = ExtensionsService.getInterestRateForDate(
      existingExtensions,
      "2021-01-22"
    );

    expect(interestRate).toBe(extension.InterestRate);
    const otherInterestRate = ExtensionsService.getInterestRateForDate(
      existingExtensions,
      "2021-01-23"
    );

    expect(otherInterestRate).toBe(otherExtension.InterestRate);
  });
});

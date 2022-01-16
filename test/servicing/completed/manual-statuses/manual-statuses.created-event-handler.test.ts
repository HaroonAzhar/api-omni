import { Test, TestingModule } from "@nestjs/testing";

import { ManualStatus } from "../../../../src/v2/modules/cases/completed/manual-statuses/manual-status.interface";
import {
  EventsRepository,
  EventContext,
} from "../../../../src/v2/utils/events";
import { CreatedManualStatusHandler } from "../../../../src/v2/modules/cases/completed/manual-statuses/handlers/created-manual-status-event.handler";
import { CreatedManualStatusEvent } from "../../../../src/v2/modules/cases/completed/manual-statuses/manual-statuses.events";

describe("CreatedManualStatusHandler", () => {
  let handler: CreatedManualStatusHandler;

  const manualStatus: ManualStatus = {
    EffectiveFrom: "2021-01-25",
    Status: "Non-Performing – Delinquent",
  };
  const context: EventContext = { CommandId: 42 };

  const storeCommandMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatedManualStatusHandler,
        {
          provide: EventsRepository,
          useValue: {
            insert: storeCommandMock,
          },
        },
      ],
    }).compile();

    handler = module.get<CreatedManualStatusHandler>(
      CreatedManualStatusHandler
    );
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Stores Event", async () => {
    const event: CreatedManualStatusEvent = new CreatedManualStatusEvent(
      manualStatus,
      context
    );
    await handler.handle(event);

    expect(storeCommandMock).toBeCalledWith({
      content: manualStatus,
      context: {
        ...context,
        Module: "manual-statuses",
        Name: "CreatedManualStatusEvent",
      },
    });
  });
});

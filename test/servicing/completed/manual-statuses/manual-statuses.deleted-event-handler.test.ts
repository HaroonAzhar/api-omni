import { Test, TestingModule } from "@nestjs/testing";

import { DeleteCommandContent } from "../../../../src/v2/modules/cases/completed/manual-statuses/manual-status.interface";
import {
  EventsRepository,
  EventContext,
} from "../../../../src/v2/utils/events";
import { DeletedManualStatusHandler } from "../../../../src/v2/modules/cases/completed/manual-statuses/handlers/deleted-manual-status-event.handler";
import { DeletedManualStatusEvent } from "../../../../src/v2/modules/cases/completed/manual-statuses/manual-statuses.events";

describe("DeletedManualStatusHandler", () => {
  let handler: DeletedManualStatusHandler;

  const content: DeleteCommandContent = {
    ManualStatusId: 24,
  };
  const context: EventContext = { CommandId: 42 };

  const storeCommandMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletedManualStatusHandler,
        {
          provide: EventsRepository,
          useValue: {
            insert: storeCommandMock,
          },
        },
      ],
    }).compile();

    handler = module.get<DeletedManualStatusHandler>(
      DeletedManualStatusHandler
    );
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Stores Event", async () => {
    const event: DeletedManualStatusEvent = new DeletedManualStatusEvent(
      content,
      context
    );
    await handler.handle(event);

    expect(storeCommandMock).toBeCalledWith({
      content,
      context: {
        ...context,
        Module: "manual-statuses",
        Name: "DeletedManualStatusEvent",
      },
    });
  });
});

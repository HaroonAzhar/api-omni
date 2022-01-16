import { Test, TestingModule } from "@nestjs/testing";

import {
  EventsRepository,
  EventContext,
} from "../../../../src/v2/utils/events";
import { DeletedDefaultEventHandler } from "../../../../src/v2/modules/cases/completed/default-events/handlers/deleted-default-event-event.handler";
import { DeletedDefaultEventEvent } from "../../../../src/v2/modules/cases/completed/default-events/default-events.events";
import { DeleteCommandContent } from "../../../../src/v2/modules/cases/completed/default-events/default-event.interface";

describe("DeletedDefaultEventHandler", () => {
  let handler: DeletedDefaultEventHandler;

  const deletedContent: DeleteCommandContent = {
    DefaultEventId: 42,
  };
  const context: EventContext = { CommandId: 42 };

  const storeCommandMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletedDefaultEventHandler,
        {
          provide: EventsRepository,
          useValue: {
            insert: storeCommandMock,
          },
        },
      ],
    }).compile();

    handler = module.get<DeletedDefaultEventHandler>(
      DeletedDefaultEventHandler
    );
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Stores Event", async () => {
    const event: DeletedDefaultEventEvent = new DeletedDefaultEventEvent(
      deletedContent,
      context
    );
    await handler.handle(event);

    expect(storeCommandMock).toBeCalledWith({
      content: deletedContent,
      context: {
        ...context,
        Module: "default-events",
        Name: "DeletedDefaultEventEvent",
      },
    });
  });
});

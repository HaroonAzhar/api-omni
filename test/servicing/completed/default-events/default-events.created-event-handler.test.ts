import { Test, TestingModule } from "@nestjs/testing";

import { DefaultEvent } from "../../../../src/v2/modules/cases/completed/default-events/default-event.interface";
import {
  EventsRepository,
  EventContext,
} from "../../../../src/v2/utils/events";
import { CreatedDefaultEventHandler } from "../../../../src/v2/modules/cases/completed/default-events/handlers/created-default-event-event.handler";
import { CreatedDefaultEventEvent } from "../../../../src/v2/modules/cases/completed/default-events/default-events.events";

describe("CreatedDefaultEventHandler", () => {
  let handler: CreatedDefaultEventHandler;

  const defaultEvent: DefaultEvent = {
    Date: "2021-01-25",
    Type: "End",
  };
  const context: EventContext = { CommandId: 42 };

  const storeCommandMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatedDefaultEventHandler,
        {
          provide: EventsRepository,
          useValue: {
            insert: storeCommandMock,
          },
        },
      ],
    }).compile();

    handler = module.get<CreatedDefaultEventHandler>(
      CreatedDefaultEventHandler
    );
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Stores Event", async () => {
    const event: CreatedDefaultEventEvent = new CreatedDefaultEventEvent(
      defaultEvent,
      context
    );
    await handler.handle(event);

    expect(storeCommandMock).toBeCalledWith({
      content: defaultEvent,
      context: {
        ...context,
        Module: "default-events",
        Name: "CreatedDefaultEventEvent",
      },
    });
  });
});

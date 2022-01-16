import { Test, TestingModule } from "@nestjs/testing";
import { EventBus } from "@nestjs/cqrs";

import { DeleteDefaultEventHandler } from "../../../../src/v2/modules/cases/completed/default-events/handlers/delete-default-event-command.handler";
import { DeleteDefaultEventCommand } from "../../../../src/v2/modules/cases/completed/default-events/default-events.commands";
import {
  CommandsRepository,
  CommandContext,
} from "../../../../src/v2/utils/commands";
import { DeleteCommandContent } from "../../../../src/v2/modules/cases/completed/default-events/default-event.interface";

describe("DeleteDefaultEventHandler", () => {
  let handler: DeleteDefaultEventHandler;

  const commandId = 42;

  const deletedContent: DeleteCommandContent = {
    DefaultEventId: 42,
  };
  const context: CommandContext = { Module: "", Trigger: "", User: "" };

  const publishMock = jest.fn();
  const storeCommandMock = jest.fn(() => Promise.resolve([commandId]));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteDefaultEventHandler,
        {
          provide: EventBus,
          useValue: { publish: publishMock },
        },
        {
          provide: CommandsRepository,
          useValue: {
            insert: storeCommandMock,
          },
        },
      ],
    }).compile();

    handler = module.get<DeleteDefaultEventHandler>(DeleteDefaultEventHandler);
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Generates event when command executed", async () => {
    const command: DeleteDefaultEventCommand = new DeleteDefaultEventCommand(
      deletedContent,
      context
    );
    await handler.execute(command);

    expect(publishMock).toBeCalledWith({
      content: deletedContent,
      context: {
        CommandId: commandId,
        Module: "default-events",
        Name: "DeletedDefaultEventEvent",
      },
    });
  });

  it("Stores command", async () => {
    const command: DeleteDefaultEventCommand = new DeleteDefaultEventCommand(
      deletedContent,
      context
    );
    await handler.execute(command);

    expect(storeCommandMock).toBeCalledWith({
      content: deletedContent,
      context: {
        ...context,
        Name: "DeleteDefaultEventCommand",
        Module: "default-events",
      },
    });
  });
});

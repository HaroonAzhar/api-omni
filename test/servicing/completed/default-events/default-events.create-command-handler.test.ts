import { Test, TestingModule } from "@nestjs/testing";
import { EventBus } from "@nestjs/cqrs";

import { DefaultEvent } from "../../../../src/v2/modules/cases/completed/default-events/default-event.interface";
import { CreateDefaultEventHandler } from "../../../../src/v2/modules/cases/completed/default-events/handlers/create-default-event-command.handler";
import { CreateDefaultEventCommand } from "../../../../src/v2/modules/cases/completed/default-events/default-events.commands";
import {
  CommandsRepository,
  CommandContext,
} from "../../../../src/v2/utils/commands";

describe("CreateDefaultEventHandler", () => {
  let handler: CreateDefaultEventHandler;

  const commandId = 42;

  const defaultEvent: DefaultEvent = {
    Date: "2021-01-25",
    Type: "End",
  };
  const context: CommandContext = { Module: "", Trigger: "", User: "" };

  const publishMock = jest.fn();
  const storeCommandMock = jest.fn(() => Promise.resolve([commandId]));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDefaultEventHandler,
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

    handler = module.get<CreateDefaultEventHandler>(CreateDefaultEventHandler);
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Generates event when command executed", async () => {
    const command: CreateDefaultEventCommand = new CreateDefaultEventCommand(
      defaultEvent,
      context
    );
    await handler.execute(command);

    expect(publishMock).toBeCalledWith({
      content: defaultEvent,
      context: {
        CommandId: commandId,
        Name: "CreatedDefaultEventEvent",
        Module: "default-events",
      },
    });
  });

  it("Stores command", async () => {
    const command: CreateDefaultEventCommand = new CreateDefaultEventCommand(
      defaultEvent,
      context
    );
    await handler.execute(command);

    expect(storeCommandMock).toBeCalledWith({
      content: defaultEvent,
      context: {
        ...context,
        Name: "CreateDefaultEventCommand",
        Module: "default-events",
      },
    });
  });
});

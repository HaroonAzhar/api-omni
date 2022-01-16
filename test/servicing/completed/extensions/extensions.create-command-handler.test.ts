import { Test, TestingModule } from "@nestjs/testing";
import { EventBus } from "@nestjs/cqrs";

import { Extension } from "../../../../src/v2/modules/cases/completed/extensions/extension.interface";
import { CreateExtensionHandler } from "../../../../src/v2/modules/cases/completed/extensions/handlers/create-extension-command.handler";
import { CreateExtensionCommand } from "../../../../src/v2/modules/cases/completed/extensions/extensions.commands";
import {
  CommandsRepository,
  CommandContext,
} from "../../../../src/v2/utils/commands";

describe("CreateExtensionHandler", () => {
  let handler: CreateExtensionHandler;

  const commandId = 42;

  const extension: Extension = {
    Date: "2021-01-25",
    InterestRate: 0.92,
  };
  const context: CommandContext = { Module: "", Trigger: "", User: "" };

  const publishMock = jest.fn();
  const storeCommandMock = jest.fn(() => Promise.resolve([commandId]));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateExtensionHandler,
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

    handler = module.get<CreateExtensionHandler>(CreateExtensionHandler);
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Generates event when command executed", async () => {
    const command: CreateExtensionCommand = new CreateExtensionCommand(
      extension,
      context
    );
    await handler.execute(command);

    expect(publishMock).toBeCalledWith({
      content: extension,
      context: {
        CommandId: commandId,
        Name: "CreatedExtensionEvent",
        Module: "extensions",
      },
    });
  });

  it("Stores command", async () => {
    const command: CreateExtensionCommand = new CreateExtensionCommand(
      extension,
      context
    );
    await handler.execute(command);

    expect(storeCommandMock).toBeCalledWith({
      content: extension,
      context: {
        ...context,
        Name: "CreateExtensionCommand",
        Module: "extensions",
      },
    });
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { EventBus } from "@nestjs/cqrs";

import { DeleteCommandContent } from "../../../../src/v2/modules/cases/completed/manual-statuses/manual-status.interface";
import { DeleteManualStatusCommandHandler } from "../../../../src/v2/modules/cases/completed/manual-statuses/handlers/delete-manual-status-command.handler";
import { DeleteManualStatusCommand } from "../../../../src/v2/modules/cases/completed/manual-statuses/manual-statuses.commands";
import {
  CommandsRepository,
  CommandContext,
} from "../../../../src/v2/utils/commands";

describe("DeleteManualStatusCommandHandler", () => {
  let handler: DeleteManualStatusCommandHandler;

  const commandId = 42;

  const content: DeleteCommandContent = {
    ManualStatusId: 24,
  };
  const context: CommandContext = { Module: "", Trigger: "", User: "" };

  const publishMock = jest.fn();
  const storeCommandMock = jest.fn(() => Promise.resolve([commandId]));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteManualStatusCommandHandler,
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

    handler = module.get<DeleteManualStatusCommandHandler>(
      DeleteManualStatusCommandHandler
    );
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Generates event when command executed", async () => {
    const command: DeleteManualStatusCommand = new DeleteManualStatusCommand(
      content,
      context
    );
    await handler.execute(command);

    expect(publishMock).toBeCalledWith({
      content: content,
      context: {
        CommandId: commandId,
        Name: "DeletedManualStatusEvent",
        Module: "manual-statuses",
      },
    });
  });

  it("Stores command", async () => {
    const command: DeleteManualStatusCommand = new DeleteManualStatusCommand(
      content,
      context
    );
    await handler.execute(command);

    expect(storeCommandMock).toBeCalledWith({
      content,
      context: {
        ...context,
        Name: "DeleteManualStatusCommand",
        Module: "manual-statuses",
      },
    });
  });
});

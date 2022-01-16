import { Test, TestingModule } from "@nestjs/testing";
import { EventBus } from "@nestjs/cqrs";

import { ManualStatus } from "../../../../src/v2/modules/cases/completed/manual-statuses/manual-status.interface";
import { CreateManualStatusCommandHandler } from "../../../../src/v2/modules/cases/completed/manual-statuses/handlers/create-manual-status-command.handler";
import { CreateManualStatusCommand } from "../../../../src/v2/modules/cases/completed/manual-statuses/manual-statuses.commands";
import {
  CommandsRepository,
  CommandContext,
} from "../../../../src/v2/utils/commands";

describe("CreateManualStatusCommandHandler", () => {
  let handler: CreateManualStatusCommandHandler;

  const commandId = 42;

  const manualStatus: ManualStatus = {
    EffectiveFrom: "2021-01-25",
    Status: "Non-Performing – Delinquent",
  };
  const context: CommandContext = { Module: "", Trigger: "", User: "" };

  const publishMock = jest.fn();
  const storeCommandMock = jest.fn(() => Promise.resolve([commandId]));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateManualStatusCommandHandler,
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

    handler = module.get<CreateManualStatusCommandHandler>(
      CreateManualStatusCommandHandler
    );
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Generates event when command executed", async () => {
    const command: CreateManualStatusCommand = new CreateManualStatusCommand(
      manualStatus,
      context
    );
    await handler.execute(command);

    expect(publishMock).toBeCalledWith({
      content: manualStatus,
      context: {
        CommandId: commandId,
        Name: "CreatedManualStatusEvent",
        Module: "manual-statuses",
      },
    });
  });

  it("Stores command", async () => {
    const command: CreateManualStatusCommand = new CreateManualStatusCommand(
      manualStatus,
      context
    );
    await handler.execute(command);

    expect(storeCommandMock).toBeCalledWith({
      content: manualStatus,
      context: {
        ...context,
        Name: "CreateManualStatusCommand",
        Module: "manual-statuses",
      },
    });
  });
});

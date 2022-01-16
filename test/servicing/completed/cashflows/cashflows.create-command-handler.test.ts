import { Test, TestingModule } from "@nestjs/testing";
import { EventBus } from "@nestjs/cqrs";

import { Cashflow } from "../../../../src/v2/modules/cases/completed/cashflows/cashflow.interface";
import { CreateCashflowHandler } from "../../../../src/v2/modules/cases/completed/cashflows/handlers/create-cashflow-command.handler";
import { CreateCashflowCommand } from "../../../../src/v2/modules/cases/completed/cashflows/cashflows.commands";
import {
  CommandsRepository,
  CommandContext,
} from "../../../../src/v2/utils/commands";

describe("CreateCashflowHandler", () => {
  let handler: CreateCashflowHandler;

  const commandId = 42;

  const cashflow: Cashflow = {
    Amount: 234,
    Description: "baz",
    ActualDate: "2021-03-22",
  };
  const context: CommandContext = { Module: "", Trigger: "", User: "" };

  const publishMock = jest.fn();
  const storeCommandMock = jest.fn(() => Promise.resolve([commandId]));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCashflowHandler,
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

    handler = module.get<CreateCashflowHandler>(CreateCashflowHandler);
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Generates event when command executed", async () => {
    const command: CreateCashflowCommand = new CreateCashflowCommand(
      cashflow,
      context
    );
    await handler.execute(command);

    expect(publishMock).toBeCalledWith({
      content: cashflow,
      context: {
        CommandId: commandId,
        Name: "CreatedCashflowEvent",
        Module: "cashflows",
      },
    });
  });

  it("Stores command", async () => {
    const command: CreateCashflowCommand = new CreateCashflowCommand(
      cashflow,
      context
    );
    await handler.execute(command);

    expect(storeCommandMock).toBeCalledWith({
      content: cashflow,
      context: {
        ...context,
        Name: "CreateCashflowCommand",
        Module: "cashflows",
      },
    });
  });
});

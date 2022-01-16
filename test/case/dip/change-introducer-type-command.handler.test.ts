import { Test, TestingModule } from "@nestjs/testing";
import { EventBus } from "@nestjs/cqrs";

import { ChangeIntroducerTypeCommandHandler } from "../../../src/v2/modules/cases/dip/handlers/change-introducer-type-command.handler";
import { ChangeIntroducerTypeCommand } from "../../../src/v2/modules/cases/dip/dip.commands";
import {
  CommandsRepository,
  CommandContext,
} from "../../../src/v2/utils/commands";
import { ChangeIntroducerTypeCommandContent } from "../../../src/v2/modules/cases/dip/dip.interface";

describe("ChangeIntroducerTypeCommandHandler", () => {
  let handler: ChangeIntroducerTypeCommandHandler;

  const commandId = 42;

  const content: ChangeIntroducerTypeCommandContent = {
    IntroducerType: "direct_application",
    FkOriginatorId: 1,
  };
  const context: CommandContext = { Module: "", Trigger: "", User: "" };

  const publishMock = jest.fn();
  const storeCommandMock = jest.fn(() => Promise.resolve([commandId]));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChangeIntroducerTypeCommandHandler,
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

    handler = module.get<ChangeIntroducerTypeCommandHandler>(
      ChangeIntroducerTypeCommandHandler
    );
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Generates event when command executed", async () => {
    const command: ChangeIntroducerTypeCommand = new ChangeIntroducerTypeCommand(
      content,
      context
    );
    await handler.execute(command);

    expect(publishMock).toBeCalledWith({
      content: content,
      context: {
        CommandId: commandId,
        Module: "dip",
        Name: "ChangedIntroducerTypeEvent",
      },
    });
  });

  it("Stores command", async () => {
    const command: ChangeIntroducerTypeCommand = new ChangeIntroducerTypeCommand(
      content,
      context
    );
    await handler.execute(command);

    expect(storeCommandMock).toBeCalledWith({
      content: content,
      context: {
        ...context,
        Name: "ChangeIntroducerTypeCommand",
        Module: "dip",
      },
    });
  });
});

import { Test, TestingModule } from "@nestjs/testing";

import { Extension } from "../../../../src/v2/modules/cases/completed/extensions/extension.interface";
import {
  EventsRepository,
  EventContext,
} from "../../../../src/v2/utils/events";
import { CreatedExtensionHandler } from "../../../../src/v2/modules/cases/completed/extensions/handlers/created-extension-event.handler";
import { CreatedExtensionEvent } from "../../../../src/v2/modules/cases/completed/extensions/extensions.events";

describe("CreatedExtensionHandler", () => {
  let handler: CreatedExtensionHandler;

  const extension: Extension = {
    Date: "2021-01-25",
    InterestRate: 1.1,
  };
  const context: EventContext = { CommandId: 42 };

  const storeCommandMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatedExtensionHandler,
        {
          provide: EventsRepository,
          useValue: {
            insert: storeCommandMock,
          },
        },
      ],
    }).compile();

    handler = module.get<CreatedExtensionHandler>(CreatedExtensionHandler);
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Stores Event", async () => {
    const event: CreatedExtensionEvent = new CreatedExtensionEvent(
      extension,
      context
    );
    await handler.handle(event);

    expect(storeCommandMock).toBeCalledWith({
      content: extension,
      context: {
        ...context,
        Module: "extensions",
        Name: "CreatedExtensionEvent",
      },
    });
  });
});

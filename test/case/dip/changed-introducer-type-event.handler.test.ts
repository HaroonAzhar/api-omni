import { Test, TestingModule } from "@nestjs/testing";

import { EventsRepository, EventContext } from "../../../src/v2/utils/events";
import { ChangedIntroducerTypeEventHandler } from "../../../src/v2/modules/cases/dip/handlers/changed-introducer-type-event.handler";
import { ChangedIntroducerTypeEvent } from "../../../src/v2/modules/cases/dip/dip.events";
import { ChangeIntroducerTypeCommandContent } from "../../../src/v2/modules/cases/dip/dip.interface";

describe("ChangedIntroducerTypeEventHandler", () => {
  let handler: ChangedIntroducerTypeEventHandler;

  const content: ChangeIntroducerTypeCommandContent = {
    FkOriginatorId: 4,
    IntroducerType: "via_broker",
  };
  const context: EventContext = { CommandId: 42 };

  const storeCommandMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChangedIntroducerTypeEventHandler,
        {
          provide: EventsRepository,
          useValue: {
            insert: storeCommandMock,
          },
        },
      ],
    }).compile();

    handler = module.get<ChangedIntroducerTypeEventHandler>(
      ChangedIntroducerTypeEventHandler
    );
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Stores Event", async () => {
    const event: ChangedIntroducerTypeEvent = new ChangedIntroducerTypeEvent(
      content,
      context
    );
    await handler.handle(event);

    expect(storeCommandMock).toBeCalledWith({
      content,
      context: {
        ...context,
        Module: "dip",
        Name: "ChangedIntroducerTypeEvent",
      },
    });
  });
});

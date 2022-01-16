import { Test, TestingModule } from "@nestjs/testing";

import { EventContext } from "../../../src/v2/utils/events";
import { ChangedDipIntroducerTypeEventHandler } from "../../../src/v2/modules/cases/application/handlers/changed-dip-introducer-type-event.handler";
import { ChangedIntroducerTypeEvent } from "../../../src/v2/modules/cases/dip/dip.events";
import { ChangeIntroducerTypeCommandContent } from "../../../src/v2/modules/cases/dip/dip.interface";
import {
  ApplicationRepositoryInterface,
  IntroducerDetailStepName,
  RecheckStatus,
} from "../../../src/v2/modules/cases/application/application.interface";

const FkCaseId = 65;
describe("ChangedDipIntroducerTypeEventHandler", () => {
  let handler: ChangedDipIntroducerTypeEventHandler;

  const content: ChangeIntroducerTypeCommandContent = {
    FkOriginatorId: 4,
    IntroducerType: "via_broker",
    FkCaseId,
  };
  const context: EventContext = { CommandId: 42 };

  const changeStepStatusMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChangedDipIntroducerTypeEventHandler,
        {
          provide: ApplicationRepositoryInterface,
          useValue: {
            changeStepStatus: changeStepStatusMock,
          },
        },
      ],
    }).compile();

    handler = module.get<ChangedDipIntroducerTypeEventHandler>(
      ChangedDipIntroducerTypeEventHandler
    );
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Changes introducer step to recheck", async () => {
    const event: ChangedIntroducerTypeEvent = new ChangedIntroducerTypeEvent(
      content,
      context
    );
    await handler.handle(event);

    expect(changeStepStatusMock).toBeCalledWith(
      FkCaseId,
      IntroducerDetailStepName,
      RecheckStatus
    );
  });
});

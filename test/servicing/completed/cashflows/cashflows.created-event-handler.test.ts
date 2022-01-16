import { Test, TestingModule } from "@nestjs/testing";

import { Cashflow } from "../../../../src/v2/modules/cases/completed/cashflows/cashflow.interface";
import {
  EventsRepository,
  EventContext,
} from "../../../../src/v2/utils/events";
import { CreatedCashflowHandler } from "../../../../src/v2/modules/cases/completed/cashflows/handlers/created-cashflow-event.handler";
import { CreatedCashflowEvent } from "../../../../src/v2/modules/cases/completed/cashflows/cashflows.events";

describe("CreatedCashflowHandler", () => {
  let handler: CreatedCashflowHandler;

  const cashflow: Cashflow = {
    Amount: 0,
    Description: "foo bar",
    ActualDate: "2021-03-22",
  };
  const context: EventContext = { CommandId: 42 };

  const storeCommandMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatedCashflowHandler,
        {
          provide: EventsRepository,
          useValue: {
            insert: storeCommandMock,
          },
        },
      ],
    }).compile();

    handler = module.get<CreatedCashflowHandler>(CreatedCashflowHandler);
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("Stores Event", async () => {
    const event: CreatedCashflowEvent = new CreatedCashflowEvent(
      cashflow,
      context
    );
    await handler.handle(event);

    expect(storeCommandMock).toBeCalledWith({
      content: cashflow,
      context: {
        ...context,
        Module: "cashflows",
        Name: "CreatedCashflowEvent",
      },
    });
  });
});

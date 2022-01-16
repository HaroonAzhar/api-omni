import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName, Cashflow } from './cashflow.interface';

export class CreatedCashflowEvent extends BaseEvent {
  content: Cashflow;
  constructor(defaultEvent: Cashflow, context: EventContext) {
    super(defaultEvent, { ...context, Module: moduleName, Name: CreatedCashflowEvent.name });
  }
}

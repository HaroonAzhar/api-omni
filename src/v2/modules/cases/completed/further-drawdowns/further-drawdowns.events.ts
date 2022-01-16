import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName, FurtherDrawdown } from './further-drawdown.interface';

export class CreatedFurtherDrawdownEvent extends BaseEvent {
  content: FurtherDrawdown;
  constructor(furtherDrawdown: FurtherDrawdown, context: EventContext) {
    super(furtherDrawdown, { ...context, Module: moduleName, Name: CreatedFurtherDrawdownEvent.name });
  }
}

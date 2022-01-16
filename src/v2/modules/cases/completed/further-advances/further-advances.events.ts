import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName, FurtherAdvance } from './further-advance.interface';

export class CreatedFurtherAdvanceEvent extends BaseEvent {
  content: FurtherAdvance;
  constructor(furtherAdvance: FurtherAdvance, context: EventContext) {
    super(furtherAdvance, { ...context, Module: moduleName, Name: CreatedFurtherAdvanceEvent.name });
  }
}

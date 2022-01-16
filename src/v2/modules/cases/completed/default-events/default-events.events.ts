import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName, DefaultEvent, DeleteCommandContent } from './default-event.interface';

export class CreatedDefaultEventEvent extends BaseEvent {
  content: DefaultEvent;
  constructor(defaultEvent: DefaultEvent, context: EventContext) {
    super(defaultEvent, { ...context, Module: moduleName, Name: CreatedDefaultEventEvent.name });
  }
}

export class DeletedDefaultEventEvent extends BaseEvent {
  content: DeleteCommandContent;
  constructor(deleted: DeleteCommandContent, context: EventContext) {
    super(deleted, { ...context, Module: moduleName, Name: DeletedDefaultEventEvent.name });
  }
}

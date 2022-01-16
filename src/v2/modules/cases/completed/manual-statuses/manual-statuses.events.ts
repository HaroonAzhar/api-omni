import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName, ManualStatus, DeleteCommandContent } from './manual-status.interface';

export class CreatedManualStatusEvent extends BaseEvent {
  content: ManualStatus;
  constructor(manualStatus: ManualStatus, context: EventContext) {
    super(manualStatus, { ...context, Module: moduleName, Name: CreatedManualStatusEvent.name });
  }
}

export class DeletedManualStatusEvent extends BaseEvent {
  content: DeleteCommandContent;
  constructor(deleted: DeleteCommandContent, context: EventContext) {
    super(deleted, { ...context, Module: moduleName, Name: DeletedManualStatusEvent.name });
  }
}

import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName, Extension } from './extension.interface';

export class CreatedExtensionEvent extends BaseEvent {
  content: Extension;
  constructor(extension: Extension, context: EventContext) {
    super(extension, { ...context, Module: moduleName, Name: CreatedExtensionEvent.name });
  }
}

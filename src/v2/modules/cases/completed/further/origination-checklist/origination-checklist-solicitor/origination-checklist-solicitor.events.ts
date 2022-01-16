import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName } from './origination-checklist-solicitor.interface';
import { OriginationChecklistEvent } from '../origination-checklist.interface';

export class EditedCommentOriginationChecklistSolicitor extends BaseEvent {
  content: OriginationChecklistEvent<string>;
  constructor(content: OriginationChecklistEvent<string>, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: EditedCommentOriginationChecklistSolicitor.name });
  }
}

import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName } from './origination-checklist-draw-down-request.interface';
import { OriginationChecklistEvent } from '../origination-checklist.interface';

export class SavedSignatoriesOriginationChecklistDrawDownRequest extends BaseEvent {
  content: OriginationChecklistEvent<string>;
  constructor(content: OriginationChecklistEvent<string>, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: SavedSignatoriesOriginationChecklistDrawDownRequest.name });
  }
}

export class AmountEnteredMatchesAmountOriginationChecklistDrawDownRequestEvent extends BaseEvent {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: EventContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: AmountEnteredMatchesAmountOriginationChecklistDrawDownRequestEvent.name,
    });
  }
}

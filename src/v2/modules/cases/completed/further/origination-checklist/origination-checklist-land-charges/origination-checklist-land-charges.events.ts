import { BaseEvent, EventContext } from '@v2/utils/events';

import {
  moduleName,
  OriginationChecklistLandChargesResultEntity,
  UpdateOriginationChecklistLandChargesResultEntity,
} from './origination-checklist-land-charges.interface';
import { OriginationChecklistEvent } from '../origination-checklist.interface';

export class CheckFacilityLetter extends BaseEvent {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: CheckFacilityLetter.name });
  }
}

export class AddedResult extends BaseEvent {
  content: OriginationChecklistLandChargesResultEntity;
  constructor(content: OriginationChecklistLandChargesResultEntity, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: AddedResult.name });
  }
}

export class UpdatedResult extends BaseEvent {
  content: UpdateOriginationChecklistLandChargesResultEntity;
  constructor(content: UpdateOriginationChecklistLandChargesResultEntity, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: UpdatedResult.name });
  }
}

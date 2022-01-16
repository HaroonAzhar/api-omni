import { BaseEvent, EventContext } from '@v2/utils/events';

import {
  moduleName,
  OriginationChecklistLandRegistryResultEntity,
} from './origination-checklist-land-registry.interface';

export class AddedOriginationChecklistLandRegistryResultEntity extends BaseEvent {
  content: OriginationChecklistLandRegistryResultEntity;
  constructor(content: OriginationChecklistLandRegistryResultEntity, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: AddedOriginationChecklistLandRegistryResultEntity.name });
  }
}

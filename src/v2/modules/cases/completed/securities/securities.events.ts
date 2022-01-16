import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName, SecurityEntity } from './security.interface';

export class CreatedSecurityEvent extends BaseEvent {
  content: SecurityEntity;
  constructor(security: SecurityEntity, context: EventContext) {
    super(security, { ...context, Module: moduleName, Name: CreatedSecurityEvent.name });
  }
}

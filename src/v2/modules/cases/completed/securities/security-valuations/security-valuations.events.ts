import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName, SecurityValuation } from './security-valuations.interface';

export class CreatedSecurityValuationEvent extends BaseEvent {
  content: SecurityValuation;
  constructor(securityValuation: SecurityValuation, context: EventContext) {
    super(securityValuation, { ...context, Module: moduleName, Name: CreatedSecurityValuationEvent.name });
  }
}

import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName, SecurityConversion } from './security-conversions.interface';

export class ConvertedSecurityEvent extends BaseEvent {
  content: SecurityConversion;
  constructor(securityConversion: SecurityConversion, context: EventContext) {
    super(securityConversion, { ...context, Module: moduleName, Name: ConvertedSecurityEvent.name });
  }
}

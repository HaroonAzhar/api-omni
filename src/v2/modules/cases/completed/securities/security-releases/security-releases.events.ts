import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName, SecurityRelease } from './security-releases.interface';

export class ReleasedSecurityEvent extends BaseEvent {
  content: SecurityRelease;
  constructor(securityRelease: SecurityRelease, context: EventContext) {
    super(securityRelease, { ...context, Module: moduleName, Name: ReleasedSecurityEvent.name });
  }
}

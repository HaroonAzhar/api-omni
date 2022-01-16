import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName } from './origination-checklist-credit-safe.interface';
import { OriginationChecklistEvent } from '../origination-checklist.interface';

export class NameMatchesOfferLetter extends BaseEvent {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: EventContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: NameMatchesOfferLetter.name,
    });
  }
}

export class EnsureNoCCJ extends BaseEvent {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: EventContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: EnsureNoCCJ.name,
    });
  }
}

export class DirectorsListedTheSame extends BaseEvent {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: EventContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: DirectorsListedTheSame.name,
    });
  }
}

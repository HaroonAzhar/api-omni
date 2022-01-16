import { BaseEvent, EventContext } from '@v2/utils/events';

import { moduleName } from './origination-checklist-reinspection-valuation.interface';
import { OriginationChecklistEvent } from '../origination-checklist.interface';

export class ValuerOnApproved extends BaseEvent {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: EventContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: ValuerOnApproved.name,
    });
  }
}

export class SignedAndDated extends BaseEvent {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: EventContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: SignedAndDated.name,
    });
  }
}

export class AddressedToCorrect extends BaseEvent {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: EventContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: AddressedToCorrect.name,
    });
  }
}

export class Within3Months extends BaseEvent {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: EventContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: Within3Months.name,
    });
  }
}

export class AddressMatches extends BaseEvent {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: EventContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: AddressMatches.name,
    });
  }
}

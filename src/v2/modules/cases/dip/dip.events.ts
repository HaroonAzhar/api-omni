import { BaseEvent, EventContext } from '@v2/utils/events';

import {
  moduleName,
  ChangeIntroducerTypeCommandContent,
  ChangeIntroducerDetailsCommandContent,
  ChangeAdvanceTypeCommandContent,
  ChangeBuildingTypeCommandContent,
  ChangeLoanDetailsCommandContent,
  ChangeSecuritiesCommandContent,
  ChangeFinancialDetailsCommandContent,
  ChangeFinancialCalculatorDetailsCommandContent,
} from './dip.interface';
import { ChangeContactCommandContent } from './dip.contact.interface';

export class ChangedIntroducerTypeEvent extends BaseEvent {
  content: ChangeIntroducerTypeCommandContent;
  constructor(content: ChangeIntroducerTypeCommandContent, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: ChangedIntroducerTypeEvent.name });
  }
}

export class ChangedIntroducerDetailsEvent extends BaseEvent {
  content: ChangeIntroducerDetailsCommandContent;
  constructor(content: ChangeIntroducerDetailsCommandContent, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: ChangedIntroducerDetailsEvent.name });
  }
}

export class ChangedAdvanceTypeEvent extends BaseEvent {
  content: ChangeAdvanceTypeCommandContent;
  constructor(content: ChangeAdvanceTypeCommandContent, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: ChangedAdvanceTypeEvent.name });
  }
}

export class ChangedContactEvent extends BaseEvent {
  content: ChangeContactCommandContent;
  constructor(content: ChangeContactCommandContent, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: ChangedContactEvent.name });
  }
}

export class ChangedBuildingTypeEvent extends BaseEvent {
  content: ChangeBuildingTypeCommandContent;
  constructor(content: ChangeBuildingTypeCommandContent, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: ChangedBuildingTypeEvent.name });
  }
}

export class ChangedSecuritiesEvent extends BaseEvent {
  content: ChangeSecuritiesCommandContent;
  constructor(content: ChangeSecuritiesCommandContent, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: ChangedSecuritiesEvent.name });
  }
}

export class ChangedLoanDetailsEvent extends BaseEvent {
  content: ChangeLoanDetailsCommandContent;
  constructor(content: ChangeLoanDetailsCommandContent, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: ChangedLoanDetailsEvent.name });
  }
}

export class ChangedFinancialDetailsEvent extends BaseEvent {
  content: ChangeFinancialDetailsCommandContent;
  constructor(content: ChangeFinancialDetailsCommandContent, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: ChangedFinancialDetailsEvent.name });
  }
}

export class ChangedFinancialCalculatorDetailsEvent extends BaseEvent {
  content: ChangeFinancialCalculatorDetailsCommandContent;
  constructor(content: ChangeFinancialCalculatorDetailsCommandContent, context: EventContext) {
    super(content, { ...context, Module: moduleName, Name: ChangedFinancialCalculatorDetailsEvent.name });
  }
}

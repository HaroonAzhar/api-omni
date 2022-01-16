import { BaseCommand, CommandContext } from '@v2/utils/commands';

import {
  ChangeIntroducerTypeCommandContent,
  ChangeIntroducerDetailsCommandContent,
  moduleName,
  ChangeAdvanceTypeCommandContent,
  ChangeBuildingTypeCommandContent,
  ChangeSecuritiesCommandContent,
  ChangeLoanDetailsCommandContent,
  ChangeFinancialDetailsCommandContent,
  ChangeFinancialCalculatorDetailsCommandContent,
} from './dip.interface';
import { ChangeContactCommandContent } from './dip.contact.interface';

export class ChangeIntroducerTypeCommand extends BaseCommand {
  content: ChangeIntroducerTypeCommandContent;
  constructor(content: ChangeIntroducerTypeCommandContent, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: ChangeIntroducerTypeCommand.name });
  }
}

export class ChangeIntroducerDetailsCommand extends BaseCommand {
  content: ChangeIntroducerDetailsCommandContent;
  constructor(content: ChangeIntroducerDetailsCommandContent, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: ChangeIntroducerDetailsCommand.name });
  }
}

export class ChangeAdvanceTypeCommand extends BaseCommand {
  content: ChangeAdvanceTypeCommandContent;
  constructor(content: ChangeAdvanceTypeCommandContent, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: ChangeAdvanceTypeCommand.name });
  }
}

export class ChangeContactCommand extends BaseCommand {
  content: ChangeContactCommandContent;
  constructor(content: ChangeContactCommandContent, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: ChangeContactCommand.name });
  }
}

export class ChangeBuildingTypeCommand extends BaseCommand {
  content: ChangeBuildingTypeCommandContent;
  constructor(content: ChangeBuildingTypeCommandContent, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: ChangeBuildingTypeCommand.name });
  }
}

export class ChangeSecuritiesCommand extends BaseCommand {
  content: ChangeSecuritiesCommandContent;
  constructor(content: ChangeSecuritiesCommandContent, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: ChangeSecuritiesCommand.name });
  }
}

export class ChangeLoanDetailsCommand extends BaseCommand {
  content: ChangeLoanDetailsCommandContent;
  constructor(content: ChangeLoanDetailsCommandContent, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: ChangeLoanDetailsCommand.name });
  }
}

export class ChangeFinancialDetailsCommand extends BaseCommand {
  content: ChangeFinancialDetailsCommandContent;
  constructor(content: ChangeFinancialDetailsCommandContent, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: ChangeFinancialDetailsCommand.name });
  }
}

export class ChangeFinancialCalculatorDetailsCommand extends BaseCommand {
  content: ChangeFinancialCalculatorDetailsCommandContent;
  constructor(content: ChangeFinancialCalculatorDetailsCommandContent, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: ChangeFinancialCalculatorDetailsCommand.name });
  }
}

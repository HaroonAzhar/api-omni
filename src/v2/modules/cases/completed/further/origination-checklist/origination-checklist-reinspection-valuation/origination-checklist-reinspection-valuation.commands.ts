import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { moduleName } from './origination-checklist-reinspection-valuation.interface';
import { OriginationChecklistEvent } from '../origination-checklist.interface';

export class MarkValuerOnApproved extends BaseCommand {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: CommandContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: MarkValuerOnApproved.name,
    });
  }
}

export class MarkSignedAndDated extends BaseCommand {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: CommandContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: MarkSignedAndDated.name,
    });
  }
}

export class MarkAddressedToCorrect extends BaseCommand {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: CommandContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: MarkAddressedToCorrect.name,
    });
  }
}

export class MarkWithin3Months extends BaseCommand {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: CommandContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: MarkWithin3Months.name,
    });
  }
}

export class MarkAddressMatches extends BaseCommand {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: CommandContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: MarkAddressMatches.name,
    });
  }
}

import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { moduleName } from './origination-checklist-credit-safe.interface';
import { OriginationChecklistEvent } from '../origination-checklist.interface';

export class MarkNameMatches extends BaseCommand {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: CommandContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: MarkNameMatches.name,
    });
  }
}

export class MarkNoCCJ extends BaseCommand {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: CommandContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: MarkNoCCJ.name,
    });
  }
}

export class MarkDirectorsSame extends BaseCommand {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: CommandContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: MarkDirectorsSame.name,
    });
  }
}

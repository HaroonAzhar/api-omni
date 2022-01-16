import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { moduleName } from './origination-checklist-draw-down-request.interface';
import { OriginationChecklistEvent } from '../origination-checklist.interface';

export class MarkAmountEnteredMatchesAmountOriginationChecklistDrawDownRequest extends BaseCommand {
  content: OriginationChecklistEvent<boolean>;
  constructor(content: OriginationChecklistEvent<boolean>, context: CommandContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: MarkAmountEnteredMatchesAmountOriginationChecklistDrawDownRequest.name,
    });
  }
}

export class SaveSignatoriesOriginationChecklistDrawDownRequest extends BaseCommand {
  content: OriginationChecklistEvent<string>;
  constructor(content: OriginationChecklistEvent<string>, context: CommandContext) {
    super(content, {
      ...context,
      Module: moduleName,
      Name: SaveSignatoriesOriginationChecklistDrawDownRequest.name,
    });
  }
}

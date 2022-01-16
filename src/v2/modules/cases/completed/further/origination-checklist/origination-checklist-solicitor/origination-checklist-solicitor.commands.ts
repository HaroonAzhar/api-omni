import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { moduleName } from './origination-checklist-solicitor.interface';
import { OriginationChecklistEvent } from '../origination-checklist.interface';

export class EditCommentOriginationChecklistSolicitor extends BaseCommand {
  content: OriginationChecklistEvent<string>;
  constructor(content: OriginationChecklistEvent<string>, context: CommandContext) {
    super(content, { ...context, Module: moduleName, Name: EditCommentOriginationChecklistSolicitor.name });
  }
}

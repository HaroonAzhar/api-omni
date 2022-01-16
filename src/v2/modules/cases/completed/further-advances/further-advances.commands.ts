import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { FurtherAdvance, moduleName } from './further-advance.interface';

export class CreateFurtherAdvanceCommand extends BaseCommand {
  content: FurtherAdvance;
  constructor(furtherAdvance: FurtherAdvance, context: CommandContext) {
    super(furtherAdvance, { ...context, Module: moduleName, Name: CreateFurtherAdvanceCommand.name });
  }
}

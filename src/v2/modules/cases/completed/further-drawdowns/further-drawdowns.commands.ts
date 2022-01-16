import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { FurtherDrawdown, moduleName } from './further-drawdown.interface';

export class CreateFurtherDrawdownCommand extends BaseCommand {
  content: FurtherDrawdown;
  constructor(furtherDrawdown: FurtherDrawdown, context: CommandContext) {
    super(furtherDrawdown, { ...context, Module: moduleName, Name: CreateFurtherDrawdownCommand.name });
  }
}

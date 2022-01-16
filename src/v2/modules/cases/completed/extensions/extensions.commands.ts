import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { Extension, moduleName } from './extension.interface';

export class CreateExtensionCommand extends BaseCommand {
  content: Extension;
  constructor(extension: Extension, context: CommandContext) {
    super(extension, { ...context, Module: moduleName, Name: CreateExtensionCommand.name });
  }
}

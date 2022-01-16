import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { SecurityEntity, moduleName } from './security.interface';

export class CreateSecurityCommand extends BaseCommand {
  content: SecurityEntity;
  constructor(security: SecurityEntity, context: CommandContext) {
    super(security, { ...context, Module: moduleName, Name: CreateSecurityCommand.name });
  }
}

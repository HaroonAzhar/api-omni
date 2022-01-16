import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { SecurityConversion, moduleName } from './security-conversions.interface';

export class ConvertSecurityCommand extends BaseCommand {
  content: SecurityConversion;
  constructor(securityConversion: SecurityConversion, context: CommandContext) {
    super(securityConversion, { ...context, Module: moduleName, Name: ConvertSecurityCommand.name });
  }
}

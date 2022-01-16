import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { SecurityValuation, moduleName } from './security-valuations.interface';

export class CreateSecurityValuationCommand extends BaseCommand {
  content: SecurityValuation;
  constructor(securityValuation: SecurityValuation, context: CommandContext) {
    super(securityValuation, { ...context, Module: moduleName, Name: CreateSecurityValuationCommand.name });
  }
}

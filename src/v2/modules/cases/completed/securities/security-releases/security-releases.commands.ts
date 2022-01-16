import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { SecurityRelease, moduleName } from './security-releases.interface';

export class ReleaseSecurityCommand extends BaseCommand {
  content: SecurityRelease;
  constructor(securityRelease: SecurityRelease, context: CommandContext) {
    super(securityRelease, { ...context, Module: moduleName, Name: ReleaseSecurityCommand.name });
  }
}

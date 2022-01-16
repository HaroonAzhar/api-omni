import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { Cashflow, moduleName } from './cashflow.interface';

export class CreateCashflowCommand extends BaseCommand {
  content: Cashflow;
  constructor(defaultEvent: Cashflow, context: CommandContext) {
    super(defaultEvent, { ...context, Module: moduleName, Name: CreateCashflowCommand.name });
  }
}

import { BaseCommand, CommandContext } from '@v2/utils/commands';

import {
  ExpectedDrawdown,
  UpdateExpectedDrawdown,
  moduleName,
  DeleteExpectedDrawdown,
} from './expected-drawdown.interface';

export class CreateExpectedDrawdownCommand extends BaseCommand {
  content: ExpectedDrawdown;
  constructor(expectedDrawdown: ExpectedDrawdown, context: CommandContext) {
    super(expectedDrawdown, { ...context, Module: moduleName, Name: CreateExpectedDrawdownCommand.name });
  }
}

export class UpdateExpectedDrawdownCommand extends BaseCommand {
  content: UpdateExpectedDrawdown;
  constructor(expectedDrawdown: UpdateExpectedDrawdown, context: CommandContext) {
    super(expectedDrawdown, { ...context, Module: moduleName, Name: UpdateExpectedDrawdownCommand.name });
  }
}

export class DeleteExpectedDrawdownCommand extends BaseCommand {
  content: DeleteExpectedDrawdown;
  constructor(expectedDrawdown: DeleteExpectedDrawdown, context: CommandContext) {
    super(expectedDrawdown, { ...context, Module: moduleName, Name: DeleteExpectedDrawdownCommand.name });
  }
}

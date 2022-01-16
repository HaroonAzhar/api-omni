import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { DefaultEvent, DeleteCommandContent, moduleName } from './default-event.interface';

export class CreateDefaultEventCommand extends BaseCommand {
  content: DefaultEvent;
  constructor(defaultEvent: DefaultEvent, context: CommandContext) {
    super(defaultEvent, { ...context, Module: moduleName, Name: CreateDefaultEventCommand.name });
  }
}

export class DeleteDefaultEventCommand extends BaseCommand {
  content: DeleteCommandContent;
  constructor(deleteContent: DeleteCommandContent, context: CommandContext) {
    super(deleteContent, { ...context, Module: moduleName, Name: DeleteDefaultEventCommand.name });
  }
}

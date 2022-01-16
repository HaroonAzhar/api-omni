import { BaseCommand, CommandContext } from '@v2/utils/commands';

import { ManualStatus, moduleName, DeleteCommandContent } from './manual-status.interface';

export class CreateManualStatusCommand extends BaseCommand {
  content: ManualStatus;
  constructor(manualStatus: ManualStatus, context: CommandContext) {
    super(manualStatus, { ...context, Module: moduleName, Name: CreateManualStatusCommand.name });
  }
}

export class DeleteManualStatusCommand extends BaseCommand {
  content: DeleteCommandContent;
  constructor(deleteContent: DeleteCommandContent, context: CommandContext) {
    super(deleteContent, { ...context, Module: moduleName, Name: DeleteManualStatusCommand.name });
  }
}

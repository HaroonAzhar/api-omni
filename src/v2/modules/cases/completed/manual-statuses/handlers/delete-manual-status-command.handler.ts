import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { DeletedManualStatusEvent } from '../manual-statuses.events';
import { DeleteManualStatusCommand } from '../manual-statuses.commands';

@CommandHandler(DeleteManualStatusCommand)
export class DeleteManualStatusCommandHandler implements ICommandHandler<DeleteManualStatusCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: DeleteManualStatusCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new DeletedManualStatusEvent(command.content, { CommandId: commandId }));
  }
}

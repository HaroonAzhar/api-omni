import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { DeletedDefaultEventEvent } from '../default-events.events';
import { DeleteDefaultEventCommand } from '../default-events.commands';

@CommandHandler(DeleteDefaultEventCommand)
export class DeleteDefaultEventHandler implements ICommandHandler<DeleteDefaultEventCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: DeleteDefaultEventCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new DeletedDefaultEventEvent(command.content, { CommandId: commandId }));
  }
}

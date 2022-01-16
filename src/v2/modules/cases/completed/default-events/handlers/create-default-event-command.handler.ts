import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { CreatedDefaultEventEvent } from '../default-events.events';
import { CreateDefaultEventCommand } from '../default-events.commands';

@CommandHandler(CreateDefaultEventCommand)
export class CreateDefaultEventHandler implements ICommandHandler<CreateDefaultEventCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: CreateDefaultEventCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new CreatedDefaultEventEvent(command.content, { CommandId: commandId }));
  }
}

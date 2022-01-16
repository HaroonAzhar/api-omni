import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { CreatedExtensionEvent } from '../extensions.events';
import { CreateExtensionCommand } from '../extensions.commands';

@CommandHandler(CreateExtensionCommand)
export class CreateExtensionHandler implements ICommandHandler<CreateExtensionCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: CreateExtensionCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new CreatedExtensionEvent(command.content, { CommandId: commandId }));
  }
}

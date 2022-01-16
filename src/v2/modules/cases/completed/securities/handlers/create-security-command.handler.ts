import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { CreateSecurityCommand } from '../securities.commands';
import { CreatedSecurityEvent } from '../securities.events';

@CommandHandler(CreateSecurityCommand)
export class CreateSecurityCommandHandler implements ICommandHandler<CreateSecurityCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: CreateSecurityCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new CreatedSecurityEvent(command.content, { CommandId: commandId }));
  }
}

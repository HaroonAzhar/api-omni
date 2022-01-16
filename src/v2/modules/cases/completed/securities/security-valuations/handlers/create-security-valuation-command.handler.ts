import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { CreateSecurityValuationCommand } from '../security-valuations.commands';
import { CreatedSecurityValuationEvent } from '../security-valuations.events';

@CommandHandler(CreateSecurityValuationCommand)
export class CreateSecurityValuationHandler implements ICommandHandler<CreateSecurityValuationCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: CreateSecurityValuationCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new CreatedSecurityValuationEvent(command.content, { CommandId: commandId }));
  }
}

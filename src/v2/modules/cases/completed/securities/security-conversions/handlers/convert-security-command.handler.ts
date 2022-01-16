import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { ConvertSecurityCommand } from '../security-conversions.commands';
import { ConvertedSecurityEvent } from '../security-conversions.events';

@CommandHandler(ConvertSecurityCommand)
export class ConvertSecurityHandler implements ICommandHandler<ConvertSecurityCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: ConvertSecurityCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ConvertedSecurityEvent(command.content, { CommandId: commandId }));
  }
}

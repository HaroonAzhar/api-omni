import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { ReleaseSecurityCommand } from '../security-releases.commands';
import { ReleasedSecurityEvent } from '../security-releases.events';

@CommandHandler(ReleaseSecurityCommand)
export class ReleaseSecurityHandler implements ICommandHandler<ReleaseSecurityCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: ReleaseSecurityCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ReleasedSecurityEvent(command.content, { CommandId: commandId }));
  }
}

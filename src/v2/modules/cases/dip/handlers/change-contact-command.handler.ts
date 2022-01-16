import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { ChangedContactEvent } from '../dip.events';
import { ChangeContactCommand } from '../dip.commands';

@CommandHandler(ChangeContactCommand)
export class ChangeContactCommandHandler implements ICommandHandler<ChangeContactCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: ChangeContactCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ChangedContactEvent(command.content, { CommandId: commandId }));
  }
}

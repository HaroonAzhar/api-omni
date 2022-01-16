import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { ChangedIntroducerTypeEvent } from '../dip.events';
import { ChangeIntroducerTypeCommand } from '../dip.commands';

@CommandHandler(ChangeIntroducerTypeCommand)
export class ChangeIntroducerTypeCommandHandler implements ICommandHandler<ChangeIntroducerTypeCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: ChangeIntroducerTypeCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ChangedIntroducerTypeEvent(command.content, { CommandId: commandId }));
  }
}

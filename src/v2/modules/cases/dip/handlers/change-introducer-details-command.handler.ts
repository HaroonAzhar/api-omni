import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { ChangedIntroducerDetailsEvent } from '../dip.events';
import { ChangeIntroducerDetailsCommand } from '../dip.commands';

@CommandHandler(ChangeIntroducerDetailsCommand)
export class ChangeIntroducerDetailsCommandHandler implements ICommandHandler<ChangeIntroducerDetailsCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: ChangeIntroducerDetailsCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ChangedIntroducerDetailsEvent(command.content, { CommandId: commandId }));
  }
}

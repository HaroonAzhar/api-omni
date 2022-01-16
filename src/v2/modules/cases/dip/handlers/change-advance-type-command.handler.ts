import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { ChangedAdvanceTypeEvent } from '../dip.events';
import { ChangeAdvanceTypeCommand } from '../dip.commands';

@CommandHandler(ChangeAdvanceTypeCommand)
export class ChangeAdvanceTypeCommandHandler implements ICommandHandler<ChangeAdvanceTypeCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: ChangeAdvanceTypeCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ChangedAdvanceTypeEvent(command.content, { CommandId: commandId }));
  }
}

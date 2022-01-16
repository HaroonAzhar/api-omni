import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { ChangedSecuritiesEvent } from '../dip.events';
import { ChangeSecuritiesCommand } from '../dip.commands';

@CommandHandler(ChangeSecuritiesCommand)
export class ChangeSecuritiesCommandHandler implements ICommandHandler<ChangeSecuritiesCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: ChangeSecuritiesCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ChangedSecuritiesEvent(command.content, { CommandId: commandId }));
  }
}

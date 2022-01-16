import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { ChangedFinancialDetailsEvent } from '../dip.events';
import { ChangeFinancialDetailsCommand } from '../dip.commands';

@CommandHandler(ChangeFinancialDetailsCommand)
export class ChangeFinancialDetailsCommandHandler implements ICommandHandler<ChangeFinancialDetailsCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: ChangeFinancialDetailsCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ChangedFinancialDetailsEvent(command.content, { CommandId: commandId }));
  }
}

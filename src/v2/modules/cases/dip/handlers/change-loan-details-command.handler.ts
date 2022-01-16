import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { ChangedLoanDetailsEvent } from '../dip.events';
import { ChangeLoanDetailsCommand } from '../dip.commands';

@CommandHandler(ChangeLoanDetailsCommand)
export class ChangeLoanDetailsCommandHandler implements ICommandHandler<ChangeLoanDetailsCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: ChangeLoanDetailsCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ChangedLoanDetailsEvent(command.content, { CommandId: commandId }));
  }
}

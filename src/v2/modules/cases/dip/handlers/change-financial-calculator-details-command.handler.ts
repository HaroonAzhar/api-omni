import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { ChangedFinancialCalculatorDetailsEvent } from '../dip.events';
import { ChangeFinancialCalculatorDetailsCommand } from '../dip.commands';

@CommandHandler(ChangeFinancialCalculatorDetailsCommand)
export class ChangeFinancialCalculatorDetailsCommandHandler
  implements ICommandHandler<ChangeFinancialCalculatorDetailsCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: ChangeFinancialCalculatorDetailsCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ChangedFinancialCalculatorDetailsEvent(command.content, { CommandId: commandId }));
  }
}

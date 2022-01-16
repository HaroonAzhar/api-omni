import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { MarkWithin3Months } from '../origination-checklist-reinspection-valuation.commands';
import { Within3Months } from '../origination-checklist-reinspection-valuation.events';

@CommandHandler(MarkWithin3Months)
export class MarkWithin3MonthsHandler implements ICommandHandler<MarkWithin3Months> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: MarkWithin3Months): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new Within3Months(command.content, { CommandId: commandId }));
  }
}

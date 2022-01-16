import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { MarkValuerOnApproved } from '../origination-checklist-reinspection-valuation.commands';
import { ValuerOnApproved } from '../origination-checklist-reinspection-valuation.events';

@CommandHandler(MarkValuerOnApproved)
export class MarkValuerOnApprovedHandler implements ICommandHandler<MarkValuerOnApproved> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: MarkValuerOnApproved): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ValuerOnApproved(command.content, { CommandId: commandId }));
  }
}

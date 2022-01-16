import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { MarkSignedAndDated } from '../origination-checklist-reinspection-valuation.commands';
import { SignedAndDated } from '../origination-checklist-reinspection-valuation.events';

@CommandHandler(MarkSignedAndDated)
export class MarkSignedAndDatedHandler implements ICommandHandler<MarkSignedAndDated> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: MarkSignedAndDated): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new SignedAndDated(command.content, { CommandId: commandId }));
  }
}

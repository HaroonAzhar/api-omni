import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { MarkNoCCJ } from '../origination-checklist-credit-safe.commands';
import { EnsureNoCCJ } from '../origination-checklist-credit-safe.events';

@CommandHandler(MarkNoCCJ)
export class MarkNoCCJHandler implements ICommandHandler<MarkNoCCJ> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: MarkNoCCJ): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new EnsureNoCCJ(command.content, { CommandId: commandId }));
  }
}

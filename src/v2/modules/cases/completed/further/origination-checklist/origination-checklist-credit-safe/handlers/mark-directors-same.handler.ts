import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { MarkDirectorsSame } from '../origination-checklist-credit-safe.commands';
import { DirectorsListedTheSame } from '../origination-checklist-credit-safe.events';

@CommandHandler(MarkDirectorsSame)
export class MarkDirectorsSameHandler implements ICommandHandler<MarkDirectorsSame> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: MarkDirectorsSame): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new DirectorsListedTheSame(command.content, { CommandId: commandId }));
  }
}

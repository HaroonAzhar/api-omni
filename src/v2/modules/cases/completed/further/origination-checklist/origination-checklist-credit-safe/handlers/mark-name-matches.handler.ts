import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { MarkNameMatches } from '../origination-checklist-credit-safe.commands';
import { NameMatchesOfferLetter } from '../origination-checklist-credit-safe.events';

@CommandHandler(MarkNameMatches)
export class MarkNameMatchesHandler implements ICommandHandler<MarkNameMatches> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: MarkNameMatches): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new NameMatchesOfferLetter(command.content, { CommandId: commandId }));
  }
}

import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { MarkAddressMatches } from '../origination-checklist-reinspection-valuation.commands';
import { AddressMatches } from '../origination-checklist-reinspection-valuation.events';

@CommandHandler(MarkAddressMatches)
export class MarkAddressMatchesHandler implements ICommandHandler<MarkAddressMatches> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: MarkAddressMatches): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new AddressMatches(command.content, { CommandId: commandId }));
  }
}

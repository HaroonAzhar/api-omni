import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { MarkAddressedToCorrect } from '../origination-checklist-reinspection-valuation.commands';
import { AddressedToCorrect } from '../origination-checklist-reinspection-valuation.events';

@CommandHandler(MarkAddressedToCorrect)
export class MarkAddressedToCorrectHandler implements ICommandHandler<MarkAddressedToCorrect> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: MarkAddressedToCorrect): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new AddressedToCorrect(command.content, { CommandId: commandId }));
  }
}

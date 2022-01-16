import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { MarkCheckFacilityLetter } from '../origination-checklist-land-charges.commands';
import { CheckFacilityLetter } from '../origination-checklist-land-charges.events';

@CommandHandler(MarkCheckFacilityLetter)
export class MarkCheckFacilityLetterHandler implements ICommandHandler<MarkCheckFacilityLetter> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: MarkCheckFacilityLetter): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new CheckFacilityLetter(command.content, { CommandId: commandId }));
  }
}

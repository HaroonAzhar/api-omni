import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { FinalSignOfOriginationChecklist } from '../origination-checklist.commands';
import { FinalSignedOfOriginationChecklist } from '../origination-checklist.events';

@CommandHandler(FinalSignOfOriginationChecklist)
export class FinalSignOfOriginationChecklistHandler implements ICommandHandler<FinalSignOfOriginationChecklist> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: FinalSignOfOriginationChecklist): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new FinalSignedOfOriginationChecklist(command.content, { CommandId: commandId }));
  }
}

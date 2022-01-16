import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { CloseOriginationChecklist } from '../origination-checklist.commands';
import { ClosedOriginationChecklist } from '../origination-checklist.events';

@CommandHandler(CloseOriginationChecklist)
export class CloseOriginationChecklistHandler implements ICommandHandler<CloseOriginationChecklist> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: CloseOriginationChecklist): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ClosedOriginationChecklist(command.content, { CommandId: commandId }));
  }
}

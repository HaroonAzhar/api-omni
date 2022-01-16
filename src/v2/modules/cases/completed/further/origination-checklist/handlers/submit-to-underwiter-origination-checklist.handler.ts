import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { SubmitToUnderwriterOriginationChecklist } from '../origination-checklist.commands';
import { SubmitedToUnderwriterOriginationChecklist } from '../origination-checklist.events';

@CommandHandler(SubmitToUnderwriterOriginationChecklist)
export class SubmitToUnderwriterOriginationChecklistHandler
  implements ICommandHandler<SubmitToUnderwriterOriginationChecklist> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: SubmitToUnderwriterOriginationChecklist): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(
      new SubmitedToUnderwriterOriginationChecklist(command.content, { CommandId: commandId })
    );
  }
}

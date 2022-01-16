import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { EditCommentOriginationChecklistSolicitor } from '../origination-checklist-solicitor.commands';
import { EditedCommentOriginationChecklistSolicitor } from '../origination-checklist-solicitor.events';

@CommandHandler(EditCommentOriginationChecklistSolicitor)
export class EditCommentsOriginationChecklistSolicitorCommandHandler
  implements ICommandHandler<EditCommentOriginationChecklistSolicitor> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: EditCommentOriginationChecklistSolicitor): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(
      new EditedCommentOriginationChecklistSolicitor(command.content, { CommandId: commandId })
    );
  }
}

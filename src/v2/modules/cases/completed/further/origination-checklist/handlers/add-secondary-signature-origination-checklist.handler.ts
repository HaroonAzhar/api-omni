import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { AddSecondarySignatureOriginationChecklist } from '../origination-checklist.commands';
import { AddedSecondarySignatureOriginationChecklist } from '../origination-checklist.events';

@CommandHandler(AddSecondarySignatureOriginationChecklist)
export class AddSecondarySignatureOriginationChecklistCommandHandler
  implements ICommandHandler<AddSecondarySignatureOriginationChecklist> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: AddSecondarySignatureOriginationChecklist): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(
      new AddedSecondarySignatureOriginationChecklist(command.content, { CommandId: commandId }, command.moduleName)
    );
  }
}

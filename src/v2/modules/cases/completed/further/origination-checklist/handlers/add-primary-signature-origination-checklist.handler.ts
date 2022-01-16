import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { AddPrimarySignatureOriginationChecklist } from '../origination-checklist.commands';
import { AddedPrimarySignatureOriginationChecklist } from '../origination-checklist.events';

@CommandHandler(AddPrimarySignatureOriginationChecklist)
export class AddPrimarySignatureOriginationChecklistCommandHandler
  implements ICommandHandler<AddPrimarySignatureOriginationChecklist> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: AddPrimarySignatureOriginationChecklist): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(
      new AddedPrimarySignatureOriginationChecklist(command.content, { CommandId: commandId }, command.moduleName)
    );
  }
}

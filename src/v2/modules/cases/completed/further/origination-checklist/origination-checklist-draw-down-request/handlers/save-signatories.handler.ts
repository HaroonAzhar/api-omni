import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { SaveSignatoriesOriginationChecklistDrawDownRequest } from '../origination-checklist-draw-down-request.commands';
import { SavedSignatoriesOriginationChecklistDrawDownRequest } from '../origination-checklist-draw-down-request.events';

@CommandHandler(SaveSignatoriesOriginationChecklistDrawDownRequest)
export class SaveSignatoriesHandler implements ICommandHandler<SaveSignatoriesOriginationChecklistDrawDownRequest> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: SaveSignatoriesOriginationChecklistDrawDownRequest): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(
      new SavedSignatoriesOriginationChecklistDrawDownRequest(command.content, { CommandId: commandId })
    );
  }
}

import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { AddOriginationChecklistLandRegistryResultEntity } from '../origination-checklist-land-registry.commands';
import { AddedOriginationChecklistLandRegistryResultEntity } from '../origination-checklist-land-registry.events';

@CommandHandler(AddOriginationChecklistLandRegistryResultEntity)
export class AddResultHandler implements ICommandHandler<AddOriginationChecklistLandRegistryResultEntity> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: AddOriginationChecklistLandRegistryResultEntity): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(
      new AddedOriginationChecklistLandRegistryResultEntity(command.content, { CommandId: commandId })
    );
  }
}

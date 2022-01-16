import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { ChangedBuildingTypeEvent } from '../dip.events';
import { ChangeBuildingTypeCommand } from '../dip.commands';

@CommandHandler(ChangeBuildingTypeCommand)
export class ChangeBuildingTypeCommandHandler implements ICommandHandler<ChangeBuildingTypeCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: ChangeBuildingTypeCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ChangedBuildingTypeEvent(command.content, { CommandId: commandId }));
  }
}

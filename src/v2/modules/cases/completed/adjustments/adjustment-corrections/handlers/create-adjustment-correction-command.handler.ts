import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { CreatedAdjustmentCorrectionEvent } from '../adjustment-corrections.events';
import { CreateAdjustmentCorrectionCommand } from '../adjustment-corrections.commands';

@CommandHandler(CreateAdjustmentCorrectionCommand)
export class CreateAdjustmentCorrectionHandler implements ICommandHandler<CreateAdjustmentCorrectionCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: CreateAdjustmentCorrectionCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new CreatedAdjustmentCorrectionEvent(command.content, { CommandId: commandId }));
  }
}

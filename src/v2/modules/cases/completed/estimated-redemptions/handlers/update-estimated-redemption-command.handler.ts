import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { UpdateEstimatedRedemptionCommand } from '../estimated-redemptions.commands';
import { UpdatedEstimatedRedemptionEvent } from '../estimated-redemptions.events';

@CommandHandler(UpdateEstimatedRedemptionCommand)
export class UpdateEstimatedRedemptionHandler implements ICommandHandler<UpdateEstimatedRedemptionCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: UpdateEstimatedRedemptionCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new UpdatedEstimatedRedemptionEvent(command.content, { CommandId: commandId }));
  }
}

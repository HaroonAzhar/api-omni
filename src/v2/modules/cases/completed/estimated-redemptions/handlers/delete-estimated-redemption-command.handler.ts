import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { DeleteEstimatedRedemptionCommand } from '../estimated-redemptions.commands';
import { DeletedEstimatedRedemptionEvent } from '../estimated-redemptions.events';

@CommandHandler(DeleteEstimatedRedemptionCommand)
export class DeleteEstimatedRedemptionHandler implements ICommandHandler<DeleteEstimatedRedemptionCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: DeleteEstimatedRedemptionCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new DeletedEstimatedRedemptionEvent(command.content, { CommandId: commandId }));
  }
}

import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { CreateEstimatedRedemptionCommand } from '../estimated-redemptions.commands';
import { CreatedEstimatedRedemptionEvent } from '../estimated-redemptions.events';

@CommandHandler(CreateEstimatedRedemptionCommand)
export class CreateEstimatedRedemptionHandler implements ICommandHandler<CreateEstimatedRedemptionCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: CreateEstimatedRedemptionCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new CreatedEstimatedRedemptionEvent(command.content, { CommandId: commandId }));
  }
}

import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { CreatedManualStatusEvent } from '../manual-statuses.events';
import { CreateManualStatusCommand } from '../manual-statuses.commands';

@CommandHandler(CreateManualStatusCommand)
export class CreateManualStatusCommandHandler implements ICommandHandler<CreateManualStatusCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: CreateManualStatusCommand) {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new CreatedManualStatusEvent(command.content, { CommandId: commandId }));
  }
}

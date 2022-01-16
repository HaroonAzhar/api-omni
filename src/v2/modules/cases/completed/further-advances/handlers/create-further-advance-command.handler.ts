import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { CreateFurtherAdvanceCommand } from '../further-advances.commands';
import { CreatedFurtherAdvanceEvent } from '../further-advances.events';

@CommandHandler(CreateFurtherAdvanceCommand)
export class CreateFurtherAdvanceHandler implements ICommandHandler<CreateFurtherAdvanceCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: CreateFurtherAdvanceCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new CreatedFurtherAdvanceEvent(command.content, { CommandId: commandId }));
  }
}

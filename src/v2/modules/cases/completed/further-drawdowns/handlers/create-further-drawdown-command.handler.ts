import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { CreateFurtherDrawdownCommand } from '../further-drawdowns.commands';
import { CreatedFurtherDrawdownEvent } from '../further-drawdowns.events';

@CommandHandler(CreateFurtherDrawdownCommand)
export class CreateFurtherDrawdownHandler implements ICommandHandler<CreateFurtherDrawdownCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: CreateFurtherDrawdownCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new CreatedFurtherDrawdownEvent(command.content, { CommandId: commandId }));
  }
}

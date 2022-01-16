import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { CreateExpectedDrawdownCommand } from '../expected-drawdowns.commands';
import { CreatedExpectedDrawdownEvent } from '../expected-drawdowns.events';

@CommandHandler(CreateExpectedDrawdownCommand)
export class CreateExpectedDrawdownHandler implements ICommandHandler<CreateExpectedDrawdownCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: CreateExpectedDrawdownCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new CreatedExpectedDrawdownEvent(command.content, { CommandId: commandId }));
  }
}

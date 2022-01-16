import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { DeleteExpectedDrawdownCommand } from '../expected-drawdowns.commands';
import { DeletedExpectedDrawdownEvent } from '../expected-drawdowns.events';

@CommandHandler(DeleteExpectedDrawdownCommand)
export class DeleteExpectedDrawdownHandler implements ICommandHandler<DeleteExpectedDrawdownCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: DeleteExpectedDrawdownCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new DeletedExpectedDrawdownEvent(command.content, { CommandId: commandId }));
  }
}

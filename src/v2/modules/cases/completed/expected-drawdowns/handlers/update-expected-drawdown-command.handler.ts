import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { UpdateExpectedDrawdownCommand } from '../expected-drawdowns.commands';
import { UpdatedExpectedDrawdownEvent } from '../expected-drawdowns.events';

@CommandHandler(UpdateExpectedDrawdownCommand)
export class UpdateExpectedDrawdownHandler implements ICommandHandler<UpdateExpectedDrawdownCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: UpdateExpectedDrawdownCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new UpdatedExpectedDrawdownEvent(command.content, { CommandId: commandId }));
  }
}

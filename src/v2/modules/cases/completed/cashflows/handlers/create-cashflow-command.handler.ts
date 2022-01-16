import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { CreatedCashflowEvent } from '../cashflows.events';
import { CreateCashflowCommand } from '../cashflows.commands';

@CommandHandler(CreateCashflowCommand)
export class CreateCashflowHandler implements ICommandHandler<CreateCashflowCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: CreateCashflowCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new CreatedCashflowEvent(command.content, { CommandId: commandId }));
  }
}

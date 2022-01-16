import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { CreateCrossCollateralisedLoanCommand } from '../cross-collateralised-loan.commands';
import { CreatedCrossCollateralisedLoanEvent } from '../cross-collateralised-loan.events';

@CommandHandler(CreateCrossCollateralisedLoanCommand)
export class CreateCrossCollateralisedLoanHandler implements ICommandHandler<CreateCrossCollateralisedLoanCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: CreateCrossCollateralisedLoanCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new CreatedCrossCollateralisedLoanEvent(command.content, { CommandId: commandId }));
  }
}

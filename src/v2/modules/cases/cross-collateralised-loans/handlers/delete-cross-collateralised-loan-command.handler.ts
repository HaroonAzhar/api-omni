import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { DeleteCrossCollateralisedLoanCommand } from '../cross-collateralised-loan.commands';
import { DeletedCrossCollateralisedLoanEvent } from '../cross-collateralised-loan.events';

@CommandHandler(DeleteCrossCollateralisedLoanCommand)
export class DeleteCrossCollateralisedLoanHandler implements ICommandHandler<DeleteCrossCollateralisedLoanCommand> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: DeleteCrossCollateralisedLoanCommand): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new DeletedCrossCollateralisedLoanEvent(command.content, { CommandId: commandId }));
  }
}

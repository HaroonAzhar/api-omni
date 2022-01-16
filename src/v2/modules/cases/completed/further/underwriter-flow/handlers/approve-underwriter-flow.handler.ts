import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { ApproveUnderwriterFlow } from '../underwriter-flow.commands';
import { ApprovedUnderwriterFlow } from '../underwriter-flow.events';

@CommandHandler(ApproveUnderwriterFlow)
export class ApproveUnderwriterFlowHandler implements ICommandHandler<ApproveUnderwriterFlow> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: ApproveUnderwriterFlow): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ApprovedUnderwriterFlow(command.content, { CommandId: commandId }));
  }
}

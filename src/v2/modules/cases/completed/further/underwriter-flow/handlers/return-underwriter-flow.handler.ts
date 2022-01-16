import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { ReturnUnderwriterFlow } from '../underwriter-flow.commands';
import { ReturnedUnderwriterFlow } from '../underwriter-flow.events';

@CommandHandler(ReturnUnderwriterFlow)
export class ReturnUnderwriterFlowHandler implements ICommandHandler<ReturnUnderwriterFlow> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: ReturnUnderwriterFlow): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new ReturnedUnderwriterFlow(command.content, { CommandId: commandId }));
  }
}

import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { UpdateUnderwriterFlow } from '../underwriter-flow.commands';
import { UpdatedUnderwriterFlow } from '../underwriter-flow.events';

@CommandHandler(UpdateUnderwriterFlow)
export class UpdateUnderwriterFlowHandler implements ICommandHandler<UpdateUnderwriterFlow> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: UpdateUnderwriterFlow): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new UpdatedUnderwriterFlow(command.content, { CommandId: commandId }));
  }
}

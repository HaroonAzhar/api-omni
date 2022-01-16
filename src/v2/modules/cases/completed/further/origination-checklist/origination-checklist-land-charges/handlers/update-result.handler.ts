import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { UpdateResult } from '../origination-checklist-land-charges.commands';
import { UpdatedResult } from '../origination-checklist-land-charges.events';

@CommandHandler(UpdateResult)
export class UpdateResultHandler implements ICommandHandler<UpdateResult> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: UpdateResult): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new UpdatedResult(command.content, { CommandId: commandId }));
  }
}

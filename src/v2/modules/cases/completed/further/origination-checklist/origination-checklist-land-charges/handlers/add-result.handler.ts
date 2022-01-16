import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { AddResult } from '../origination-checklist-land-charges.commands';
import { AddedResult } from '../origination-checklist-land-charges.events';

@CommandHandler(AddResult)
export class AddResultHandler implements ICommandHandler<AddResult> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: AddResult): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new AddedResult(command.content, { CommandId: commandId }));
  }
}

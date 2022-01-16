import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { InitialCheckOriginationChecklist } from '../origination-checklist.commands';
import { InitialCheckedOriginationChecklist } from '../origination-checklist.events';

@CommandHandler(InitialCheckOriginationChecklist)
export class InitialCheckOriginationChecklistHandler implements ICommandHandler<InitialCheckOriginationChecklist> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: InitialCheckOriginationChecklist): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(new InitialCheckedOriginationChecklist(command.content, { CommandId: commandId }));
  }
}

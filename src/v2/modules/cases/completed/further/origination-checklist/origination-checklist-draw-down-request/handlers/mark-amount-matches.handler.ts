import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CommandsRepository } from '@v2/utils/commands';

import { MarkAmountEnteredMatchesAmountOriginationChecklistDrawDownRequest } from '../origination-checklist-draw-down-request.commands';
import { AmountEnteredMatchesAmountOriginationChecklistDrawDownRequestEvent } from '../origination-checklist-draw-down-request.events';

@CommandHandler(MarkAmountEnteredMatchesAmountOriginationChecklistDrawDownRequest)
export class MarkAmountMatchesHandler
  implements ICommandHandler<MarkAmountEnteredMatchesAmountOriginationChecklistDrawDownRequest> {
  constructor(private eventBus: EventBus, private readonly commandStorage: CommandsRepository) {}
  async execute(command: MarkAmountEnteredMatchesAmountOriginationChecklistDrawDownRequest): Promise<void> {
    const [commandId] = await this.commandStorage.insert(command);
    await this.eventBus.publish(
      new AmountEnteredMatchesAmountOriginationChecklistDrawDownRequestEvent(command.content, { CommandId: commandId })
    );
  }
}

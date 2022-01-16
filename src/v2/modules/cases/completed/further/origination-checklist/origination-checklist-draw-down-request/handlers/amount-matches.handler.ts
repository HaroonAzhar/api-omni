import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { AmountEnteredMatchesAmountOriginationChecklistDrawDownRequestEvent } from '../origination-checklist-draw-down-request.events';

@EventsHandler(AmountEnteredMatchesAmountOriginationChecklistDrawDownRequestEvent)
export class AmountMatchesHandler
  implements IEventHandler<AmountEnteredMatchesAmountOriginationChecklistDrawDownRequestEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: AmountEnteredMatchesAmountOriginationChecklistDrawDownRequestEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

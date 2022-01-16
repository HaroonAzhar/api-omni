import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { CreatedCashflowEvent } from '../cashflows.events';

@EventsHandler(CreatedCashflowEvent)
export class CreatedCashflowHandler implements IEventHandler<CreatedCashflowEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: CreatedCashflowEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

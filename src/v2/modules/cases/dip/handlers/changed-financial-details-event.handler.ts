import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ChangedFinancialDetailsEvent } from '../dip.events';

@EventsHandler(ChangedFinancialDetailsEvent)
export class ChangedFinancialDetailsEventHandler implements IEventHandler<ChangedFinancialDetailsEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ChangedFinancialDetailsEvent) {
    await this.eventStorage.insert(event);
  }
}

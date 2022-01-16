import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { Within3Months } from '../origination-checklist-reinspection-valuation.events';

@EventsHandler(Within3Months)
export class Within3MonthsHandler implements IEventHandler<Within3Months> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: Within3Months): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { AddressMatches } from '../origination-checklist-reinspection-valuation.events';

@EventsHandler(AddressMatches)
export class AddressMatchesHandler implements IEventHandler<AddressMatches> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: AddressMatches): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

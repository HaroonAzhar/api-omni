import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { NameMatchesOfferLetter } from '../origination-checklist-credit-safe.events';

@EventsHandler(NameMatchesOfferLetter)
export class NameMatchesHandler implements IEventHandler<NameMatchesOfferLetter> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: NameMatchesOfferLetter): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { AddressedToCorrect } from '../origination-checklist-reinspection-valuation.events';

@EventsHandler(AddressedToCorrect)
export class AddressedToCorrectHandler implements IEventHandler<AddressedToCorrect> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: AddressedToCorrect): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

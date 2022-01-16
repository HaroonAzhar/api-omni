import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { CheckFacilityLetter } from '../origination-checklist-land-charges.events';

@EventsHandler(CheckFacilityLetter)
export class CheckFacilityLetterHandler implements IEventHandler<CheckFacilityLetter> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: CheckFacilityLetter): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

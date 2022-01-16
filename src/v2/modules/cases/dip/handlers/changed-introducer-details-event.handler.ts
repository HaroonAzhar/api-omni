import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ChangedIntroducerDetailsEvent } from '../dip.events';

@EventsHandler(ChangedIntroducerDetailsEvent)
export class ChangedIntroducerDetailsEventHandler implements IEventHandler<ChangedIntroducerDetailsEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ChangedIntroducerDetailsEvent) {
    await this.eventStorage.insert(event);
  }
}

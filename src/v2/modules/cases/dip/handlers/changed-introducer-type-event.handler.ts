import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ChangedIntroducerTypeEvent } from '../dip.events';

@EventsHandler(ChangedIntroducerTypeEvent)
export class ChangedIntroducerTypeEventHandler implements IEventHandler<ChangedIntroducerTypeEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ChangedIntroducerTypeEvent) {
    await this.eventStorage.insert(event);
  }
}

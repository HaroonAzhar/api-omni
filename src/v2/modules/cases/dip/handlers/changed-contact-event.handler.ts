import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ChangedContactEvent } from '../dip.events';

@EventsHandler(ChangedContactEvent)
export class ChangedContactEventHandler implements IEventHandler<ChangedContactEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ChangedContactEvent) {
    await this.eventStorage.insert(event);
  }
}

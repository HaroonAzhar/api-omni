import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ChangedAdvanceTypeEvent } from '../dip.events';

@EventsHandler(ChangedAdvanceTypeEvent)
export class ChangedAdvanceTypeEventHandler implements IEventHandler<ChangedAdvanceTypeEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ChangedAdvanceTypeEvent) {
    await this.eventStorage.insert(event);
  }
}

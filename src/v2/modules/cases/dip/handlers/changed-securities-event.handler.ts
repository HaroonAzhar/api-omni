import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ChangedSecuritiesEvent } from '../dip.events';

@EventsHandler(ChangedSecuritiesEvent)
export class ChangedSecuritiesEventHandler implements IEventHandler<ChangedSecuritiesEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ChangedSecuritiesEvent) {
    await this.eventStorage.insert(event);
  }
}

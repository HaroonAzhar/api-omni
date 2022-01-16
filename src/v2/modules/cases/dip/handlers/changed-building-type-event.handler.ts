import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ChangedBuildingTypeEvent } from '../dip.events';

@EventsHandler(ChangedBuildingTypeEvent)
export class ChangedBuildingTypeEventHandler implements IEventHandler<ChangedBuildingTypeEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ChangedBuildingTypeEvent) {
    await this.eventStorage.insert(event);
  }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { CreatedManualStatusEvent } from '../manual-statuses.events';

@EventsHandler(CreatedManualStatusEvent)
export class CreatedManualStatusHandler implements IEventHandler<CreatedManualStatusEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: CreatedManualStatusEvent) {
    await this.eventStorage.insert(event);
  }
}

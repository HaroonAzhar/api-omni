import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { CreatedDefaultEventEvent } from '../default-events.events';

@EventsHandler(CreatedDefaultEventEvent)
export class CreatedDefaultEventHandler implements IEventHandler<CreatedDefaultEventEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: CreatedDefaultEventEvent) {
    await this.eventStorage.insert(event);
  }
}

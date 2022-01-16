import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { DeletedDefaultEventEvent } from '../default-events.events';

@EventsHandler(DeletedDefaultEventEvent)
export class DeletedDefaultEventHandler implements IEventHandler<DeletedDefaultEventEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: DeletedDefaultEventEvent) {
    await this.eventStorage.insert(event);
  }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { DeletedManualStatusEvent } from '../manual-statuses.events';

@EventsHandler(DeletedManualStatusEvent)
export class DeletedManualStatusHandler implements IEventHandler<DeletedManualStatusEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: DeletedManualStatusEvent) {
    await this.eventStorage.insert(event);
  }
}

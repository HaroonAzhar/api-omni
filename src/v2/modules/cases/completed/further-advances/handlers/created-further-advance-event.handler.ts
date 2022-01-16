import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { CreatedFurtherAdvanceEvent } from '../further-advances.events';

@EventsHandler(CreatedFurtherAdvanceEvent)
export class CreatedFurtherAdvanceHandler implements IEventHandler<CreatedFurtherAdvanceEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: CreatedFurtherAdvanceEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

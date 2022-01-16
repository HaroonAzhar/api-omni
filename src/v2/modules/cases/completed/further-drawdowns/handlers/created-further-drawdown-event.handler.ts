import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { CreatedFurtherDrawdownEvent } from '../further-drawdowns.events';

@EventsHandler(CreatedFurtherDrawdownEvent)
export class CreatedFurtherDrawdownHandler implements IEventHandler<CreatedFurtherDrawdownEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: CreatedFurtherDrawdownEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

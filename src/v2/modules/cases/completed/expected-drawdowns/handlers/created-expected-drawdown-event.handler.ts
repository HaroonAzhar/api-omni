import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { CreatedExpectedDrawdownEvent } from '../expected-drawdowns.events';

@EventsHandler(CreatedExpectedDrawdownEvent)
export class CreatedExpectedDrawdownHandler implements IEventHandler<CreatedExpectedDrawdownEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: CreatedExpectedDrawdownEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

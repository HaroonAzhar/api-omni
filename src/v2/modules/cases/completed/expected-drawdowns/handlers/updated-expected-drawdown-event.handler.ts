import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { UpdatedExpectedDrawdownEvent } from '../expected-drawdowns.events';

@EventsHandler(UpdatedExpectedDrawdownEvent)
export class UpdatedExpectedDrawdownHandler implements IEventHandler<UpdatedExpectedDrawdownEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: UpdatedExpectedDrawdownEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

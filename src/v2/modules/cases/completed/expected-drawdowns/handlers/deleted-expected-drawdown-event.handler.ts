import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { DeletedExpectedDrawdownEvent } from '../expected-drawdowns.events';

@EventsHandler(DeletedExpectedDrawdownEvent)
export class DeletedExpectedDrawdownHandler implements IEventHandler<DeletedExpectedDrawdownEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: DeletedExpectedDrawdownEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

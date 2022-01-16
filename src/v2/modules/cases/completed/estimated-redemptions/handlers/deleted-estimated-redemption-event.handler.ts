import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { DeletedEstimatedRedemptionEvent } from '../estimated-redemptions.events';

@EventsHandler(DeletedEstimatedRedemptionEvent)
export class DeletedEstimatedRedemptionHandler implements IEventHandler<DeletedEstimatedRedemptionEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: DeletedEstimatedRedemptionEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

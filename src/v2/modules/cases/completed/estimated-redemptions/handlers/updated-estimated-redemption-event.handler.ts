import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { UpdatedEstimatedRedemptionEvent } from '../estimated-redemptions.events';

@EventsHandler(UpdatedEstimatedRedemptionEvent)
export class UpdatedEstimatedRedemptionHandler implements IEventHandler<UpdatedEstimatedRedemptionEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: UpdatedEstimatedRedemptionEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { CreatedEstimatedRedemptionEvent } from '../estimated-redemptions.events';

@EventsHandler(CreatedEstimatedRedemptionEvent)
export class CreatedEstimatedRedemptionHandler implements IEventHandler<CreatedEstimatedRedemptionEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: CreatedEstimatedRedemptionEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

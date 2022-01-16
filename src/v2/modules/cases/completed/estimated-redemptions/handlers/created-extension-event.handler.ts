import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CreatedExtensionEvent } from '../../extensions/extensions.events';
import { EstimatedRedemption } from '../estimated-redemption.interface';
import { EstimatedRedemptionsService } from '../estimated-redemptions.service';

@EventsHandler(CreatedExtensionEvent)
export class CreatedExtensionHandlerEstimatedRedemptions implements IEventHandler<CreatedExtensionEvent> {
  constructor(private readonly estimatedRedemptionsService: EstimatedRedemptionsService) {}

  async handle(event: CreatedExtensionEvent): Promise<void> {
    const { content } = event;
    const { Date, FkCompletedId } = content;
    const estimatedRedemptions = await this.estimatedRedemptionsService.getForCompletedId(FkCompletedId);

    const remainder = EstimatedRedemptionsService.lastRemainder(estimatedRedemptions) as EstimatedRedemption;

    if (remainder) {
      await this.estimatedRedemptionsService.update(FkCompletedId, { Date }, remainder.EstimatedRedemptionId);
    }
  }
}

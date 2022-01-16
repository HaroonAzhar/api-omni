import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { CreatedAdjustmentCorrectionEvent } from '../adjustment-corrections.events';

@EventsHandler(CreatedAdjustmentCorrectionEvent)
export class CreatedAdjustmentCorrectionHandler implements IEventHandler<CreatedAdjustmentCorrectionEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: CreatedAdjustmentCorrectionEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

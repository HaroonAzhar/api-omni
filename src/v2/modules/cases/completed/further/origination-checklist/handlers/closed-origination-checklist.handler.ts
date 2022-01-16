import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ClosedOriginationChecklist } from '../origination-checklist.events';

@EventsHandler(ClosedOriginationChecklist)
export class ClosedOriginationChecklistHandler implements IEventHandler<ClosedOriginationChecklist> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ClosedOriginationChecklist): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

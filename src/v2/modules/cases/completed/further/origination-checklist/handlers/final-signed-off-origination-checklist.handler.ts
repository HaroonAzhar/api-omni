import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { FinalSignedOfOriginationChecklist } from '../origination-checklist.events';

@EventsHandler(FinalSignedOfOriginationChecklist)
export class FinalSignedOfOriginationChecklistHandler implements IEventHandler<FinalSignedOfOriginationChecklist> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: FinalSignedOfOriginationChecklist): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

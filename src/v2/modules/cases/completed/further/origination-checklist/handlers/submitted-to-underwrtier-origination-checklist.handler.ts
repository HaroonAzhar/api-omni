import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { SubmitedToUnderwriterOriginationChecklist } from '../origination-checklist.events';

@EventsHandler(SubmitedToUnderwriterOriginationChecklist)
export class SubmitedToUnderwriterOriginationChecklistHandler
  implements IEventHandler<SubmitedToUnderwriterOriginationChecklist> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: SubmitedToUnderwriterOriginationChecklist): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

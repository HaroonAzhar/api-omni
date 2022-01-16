import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { InitialCheckedOriginationChecklist } from '../origination-checklist.events';

@EventsHandler(InitialCheckedOriginationChecklist)
export class InitialCheckedOriginationChecklistHandler implements IEventHandler<InitialCheckedOriginationChecklist> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: InitialCheckedOriginationChecklist): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

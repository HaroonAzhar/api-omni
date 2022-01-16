import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { AddedPrimarySignatureOriginationChecklist } from '../origination-checklist.events';

@EventsHandler(AddedPrimarySignatureOriginationChecklist)
export class AddedPrimarySignatureOriginationChecklistHandler
  implements IEventHandler<AddedPrimarySignatureOriginationChecklist> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: AddedPrimarySignatureOriginationChecklist): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

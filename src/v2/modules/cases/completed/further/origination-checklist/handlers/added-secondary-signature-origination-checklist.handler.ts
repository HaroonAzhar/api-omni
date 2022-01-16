import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { AddedSecondarySignatureOriginationChecklist } from '../origination-checklist.events';

@EventsHandler(AddedSecondarySignatureOriginationChecklist)
export class AddedSecondarySignatureOriginationChecklistHandler
  implements IEventHandler<AddedSecondarySignatureOriginationChecklist> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: AddedSecondarySignatureOriginationChecklist): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

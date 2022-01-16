import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { SavedSignatoriesOriginationChecklistDrawDownRequest } from '../origination-checklist-draw-down-request.events';

@EventsHandler(SavedSignatoriesOriginationChecklistDrawDownRequest)
export class SavedSignatoriesHandler implements IEventHandler<SavedSignatoriesOriginationChecklistDrawDownRequest> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: SavedSignatoriesOriginationChecklistDrawDownRequest): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

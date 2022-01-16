import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { AddedOriginationChecklistLandRegistryResultEntity } from '../origination-checklist-land-registry.events';

@EventsHandler(AddedOriginationChecklistLandRegistryResultEntity)
export class AddedResultHandler implements IEventHandler<AddedOriginationChecklistLandRegistryResultEntity> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: AddedOriginationChecklistLandRegistryResultEntity): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

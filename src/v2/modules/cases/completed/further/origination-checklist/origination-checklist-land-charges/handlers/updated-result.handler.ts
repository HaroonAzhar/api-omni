import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { UpdatedResult } from '../origination-checklist-land-charges.events';

@EventsHandler(UpdatedResult)
export class UpdatedResultHandler implements IEventHandler<UpdatedResult> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: UpdatedResult): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

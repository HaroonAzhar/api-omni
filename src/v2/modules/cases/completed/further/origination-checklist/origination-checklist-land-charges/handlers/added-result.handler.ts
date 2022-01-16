import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { AddedResult } from '../origination-checklist-land-charges.events';

@EventsHandler(AddedResult)
export class AddedResultHandler implements IEventHandler<AddedResult> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: AddedResult): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

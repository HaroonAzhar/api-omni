import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { DirectorsListedTheSame } from '../origination-checklist-credit-safe.events';

@EventsHandler(DirectorsListedTheSame)
export class DirectorsListedTheSameHandler implements IEventHandler<DirectorsListedTheSame> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: DirectorsListedTheSame): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

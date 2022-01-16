import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { EnsureNoCCJ } from '../origination-checklist-credit-safe.events';

@EventsHandler(EnsureNoCCJ)
export class EnsureNoCCJHandler implements IEventHandler<EnsureNoCCJ> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: EnsureNoCCJ): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

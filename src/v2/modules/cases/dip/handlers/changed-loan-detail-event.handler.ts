import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ChangedLoanDetailsEvent } from '../dip.events';

@EventsHandler(ChangedLoanDetailsEvent)
export class ChangedLoanDetailsEventHandler implements IEventHandler<ChangedLoanDetailsEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ChangedLoanDetailsEvent) {
    await this.eventStorage.insert(event);
  }
}

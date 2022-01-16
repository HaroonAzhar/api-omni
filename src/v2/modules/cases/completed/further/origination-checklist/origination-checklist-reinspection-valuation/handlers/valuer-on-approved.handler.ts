import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ValuerOnApproved } from '../origination-checklist-reinspection-valuation.events';

@EventsHandler(ValuerOnApproved)
export class ValuerOnApprovedHandler implements IEventHandler<ValuerOnApproved> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ValuerOnApproved): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

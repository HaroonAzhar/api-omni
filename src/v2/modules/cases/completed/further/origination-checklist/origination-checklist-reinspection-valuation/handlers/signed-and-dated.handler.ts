import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { SignedAndDated } from '../origination-checklist-reinspection-valuation.events';

@EventsHandler(SignedAndDated)
export class SignedAndDatedHandler implements IEventHandler<SignedAndDated> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: SignedAndDated): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

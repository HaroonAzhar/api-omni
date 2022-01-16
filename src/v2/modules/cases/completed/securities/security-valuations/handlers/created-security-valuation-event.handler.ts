import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { CreatedSecurityValuationEvent } from '../security-valuations.events';

@EventsHandler(CreatedSecurityValuationEvent)
export class CreatedSecurityValuationHandler implements IEventHandler<CreatedSecurityValuationEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: CreatedSecurityValuationEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

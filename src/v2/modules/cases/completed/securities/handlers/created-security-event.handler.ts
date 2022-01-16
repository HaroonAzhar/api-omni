import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { CreatedSecurityEvent } from '../securities.events';

@EventsHandler(CreatedSecurityEvent)
export class CreatedSecurityHandler implements IEventHandler<CreatedSecurityEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: CreatedSecurityEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

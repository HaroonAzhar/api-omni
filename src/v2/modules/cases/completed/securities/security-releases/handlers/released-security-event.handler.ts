import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ReleasedSecurityEvent } from '../security-releases.events';

@EventsHandler(ReleasedSecurityEvent)
export class ReleasedSecurityHandler implements IEventHandler<ReleasedSecurityEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ReleasedSecurityEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ConvertedSecurityEvent } from '../security-conversions.events';

@EventsHandler(ConvertedSecurityEvent)
export class ConvertedSecurityHandler implements IEventHandler<ConvertedSecurityEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ConvertedSecurityEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

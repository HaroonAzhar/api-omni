import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { CreatedExtensionEvent } from '../extensions.events';

@EventsHandler(CreatedExtensionEvent)
export class CreatedExtensionHandler implements IEventHandler<CreatedExtensionEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: CreatedExtensionEvent) {
    await this.eventStorage.insert(event);
  }
}

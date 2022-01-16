import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ReturnedUnderwriterFlow } from '../underwriter-flow.events';

@EventsHandler(ReturnedUnderwriterFlow)
export class ReturnedUnderwriterFlowHandler implements IEventHandler<ReturnedUnderwriterFlow> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ReturnedUnderwriterFlow): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

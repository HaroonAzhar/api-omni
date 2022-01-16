import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ApprovedUnderwriterFlow } from '../underwriter-flow.events';

@EventsHandler(ApprovedUnderwriterFlow)
export class ApprovedUnderwriterFlowHandler implements IEventHandler<ApprovedUnderwriterFlow> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ApprovedUnderwriterFlow): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

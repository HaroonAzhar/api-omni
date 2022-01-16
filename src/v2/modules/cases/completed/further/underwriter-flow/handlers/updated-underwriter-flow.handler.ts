import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { UpdatedUnderwriterFlow } from '../underwriter-flow.events';

@EventsHandler(UpdatedUnderwriterFlow)
export class UpdatedUnderwriterFlowHandler implements IEventHandler<UpdatedUnderwriterFlow> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: UpdatedUnderwriterFlow): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

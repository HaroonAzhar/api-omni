import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChangedIntroducerDetailsEvent } from '../../dip/dip.events';
import { ApplicationRepositoryInterface, RecheckStatus, IntroducerDetailStepName } from '../application.interface';

@EventsHandler(ChangedIntroducerDetailsEvent)
export class ChangedDipIntroducerDetailsEventHandler implements IEventHandler<ChangedIntroducerDetailsEvent> {
  constructor(private readonly repository: ApplicationRepositoryInterface) {}

  async handle(event: ChangedIntroducerDetailsEvent) {
    await this.repository.changeStepStatus(event.content.FkCaseId, IntroducerDetailStepName, RecheckStatus);
  }
}

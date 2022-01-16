import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChangedIntroducerTypeEvent } from '../../dip/dip.events';
import { ApplicationRepositoryInterface, RecheckStatus, IntroducerDetailStepName } from '../application.interface';

@EventsHandler(ChangedIntroducerTypeEvent)
export class ChangedDipIntroducerTypeEventHandler implements IEventHandler<ChangedIntroducerTypeEvent> {
  constructor(private readonly repository: ApplicationRepositoryInterface) {}

  async handle(event: ChangedIntroducerTypeEvent) {
    await this.repository.changeStepStatus(event.content.FkCaseId, IntroducerDetailStepName, RecheckStatus);
  }
}

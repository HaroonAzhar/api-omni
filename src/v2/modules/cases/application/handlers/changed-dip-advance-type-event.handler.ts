import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChangedAdvanceTypeEvent } from '../../dip/dip.events';
import { ApplicationRepositoryInterface, RecheckStatus, LoanDetailsStepName } from '../application.interface';

@EventsHandler(ChangedAdvanceTypeEvent)
export class ChangedDipAdvanceTypeEventHandler implements IEventHandler<ChangedAdvanceTypeEvent> {
  constructor(private readonly repository: ApplicationRepositoryInterface) {}

  async handle(event: ChangedAdvanceTypeEvent) {
    await this.repository.changeStepStatus(event.content.FkCaseId, LoanDetailsStepName, RecheckStatus);
  }
}

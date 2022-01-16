import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChangedLoanDetailsEvent } from '../../dip/dip.events';
import { ApplicationRepositoryInterface } from '../application.interface';
import { handleDipFinancialChange } from './handle-dip-financial-change';

@EventsHandler(ChangedLoanDetailsEvent)
export class ChangedDipLoanDetailsEventHandler implements IEventHandler<ChangedLoanDetailsEvent> {
  constructor(private readonly repository: ApplicationRepositoryInterface) {}

  async handle(event: ChangedLoanDetailsEvent) {
    await handleDipFinancialChange(event, this.repository);
  }
}

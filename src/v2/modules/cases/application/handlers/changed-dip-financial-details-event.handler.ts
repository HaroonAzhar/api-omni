import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChangedFinancialDetailsEvent } from '../../dip/dip.events';
import { ApplicationRepositoryInterface } from '../application.interface';
import { handleDipFinancialChange } from './handle-dip-financial-change';

@EventsHandler(ChangedFinancialDetailsEvent)
export class ChangedDipFinancialDetailsEventHandler implements IEventHandler<ChangedFinancialDetailsEvent> {
  constructor(private readonly repository: ApplicationRepositoryInterface) {}

  async handle(event: ChangedFinancialDetailsEvent) {
    await handleDipFinancialChange(event, this.repository);
  }
}

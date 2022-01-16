import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChangedFinancialCalculatorDetailsEvent } from '../../dip/dip.events';
import { ApplicationRepositoryInterface } from '../application.interface';
import { handleDipFinancialChange } from './handle-dip-financial-change';

@EventsHandler(ChangedFinancialCalculatorDetailsEvent)
export class ChangedDipFinancialCalculatorDetailsEventHandler
  implements IEventHandler<ChangedFinancialCalculatorDetailsEvent> {
  constructor(private readonly repository: ApplicationRepositoryInterface) {}

  async handle(event: ChangedFinancialCalculatorDetailsEvent) {
    await handleDipFinancialChange(event, this.repository);
  }
}

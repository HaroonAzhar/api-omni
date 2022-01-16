import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { ChangedFinancialCalculatorDetailsEvent } from '../dip.events';

@EventsHandler(ChangedFinancialCalculatorDetailsEvent)
export class ChangedFinancialCalculatorDetailsEventHandler
  implements IEventHandler<ChangedFinancialCalculatorDetailsEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: ChangedFinancialCalculatorDetailsEvent) {
    await this.eventStorage.insert(event);
  }
}

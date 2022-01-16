import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { CreatedCrossCollateralisedLoanEvent } from '../cross-collateralised-loan.events';

@EventsHandler(CreatedCrossCollateralisedLoanEvent)
export class CreatedCrossCollateralisedLoanHandler implements IEventHandler<CreatedCrossCollateralisedLoanEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: CreatedCrossCollateralisedLoanEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventsRepository } from '@v2/utils/events';

import { DeletedCrossCollateralisedLoanEvent } from '../cross-collateralised-loan.events';

@EventsHandler(DeletedCrossCollateralisedLoanEvent)
export class DeletedCrossCollateralisedLoanHandler implements IEventHandler<DeletedCrossCollateralisedLoanEvent> {
  constructor(private readonly eventStorage: EventsRepository) {}

  async handle(event: DeletedCrossCollateralisedLoanEvent): Promise<void> {
    await this.eventStorage.insert(event);
  }
}

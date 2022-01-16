import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChangedSecuritiesEvent } from '../../dip/dip.events';
import { ApplicationRepositoryInterface } from '../application.interface';
import { handleDipSecuritiesChange } from './handle-dip-securities-change';

@EventsHandler(ChangedSecuritiesEvent)
export class ChangedDipSecuritiesEventHandler implements IEventHandler<ChangedSecuritiesEvent> {
  constructor(private readonly repository: ApplicationRepositoryInterface) {}

  async handle(event: ChangedSecuritiesEvent) {
    await handleDipSecuritiesChange(event, this.repository);
  }
}

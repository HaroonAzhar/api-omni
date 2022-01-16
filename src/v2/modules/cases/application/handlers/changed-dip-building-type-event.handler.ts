import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChangedBuildingTypeEvent } from '../../dip/dip.events';
import { ApplicationRepositoryInterface } from '../application.interface';
import { handleDipSecuritiesChange } from './handle-dip-securities-change';

@EventsHandler(ChangedBuildingTypeEvent)
export class ChangedDipBuildingTypeEventHandler implements IEventHandler<ChangedBuildingTypeEvent> {
  constructor(private readonly repository: ApplicationRepositoryInterface) {}

  async handle(event: ChangedBuildingTypeEvent) {
    await handleDipSecuritiesChange(event, this.repository);
  }
}

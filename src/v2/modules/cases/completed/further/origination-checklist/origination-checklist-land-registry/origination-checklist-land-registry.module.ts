import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { OriginationChecklistModule } from '../origination-checklist.module';
import { OriginationChecklistLandRegistryController } from './origination-checklist-land-registry.controller';
import { OriginationChecklistLandRegistryRepository } from './origination-checklist-land-registry.repository';
import {
  OriginationChecklistLandRegistryService,
  OriginationChecklistLandRegistryRepositoryInterface,
} from './origination-checklist-land-registry.service';
import { AddResultHandler } from './handlers/add-result.handler';
import { AddedResultHandler } from './handlers/added-result.handler';

const CommandHandlers = [AddResultHandler];
const EventHandlers = [AddedResultHandler];

@Module({
  controllers: [OriginationChecklistLandRegistryController],
  providers: [
    OriginationChecklistLandRegistryService,
    {
      provide: OriginationChecklistLandRegistryRepositoryInterface,
      useClass: OriginationChecklistLandRegistryRepository,
    },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [OriginationChecklistLandRegistryService],
  imports: [forwardRef(() => OriginationChecklistModule), CqrsModule, EventsModule, CommandsModule],
})
export class OriginationChecklistLandRegistryModule {}

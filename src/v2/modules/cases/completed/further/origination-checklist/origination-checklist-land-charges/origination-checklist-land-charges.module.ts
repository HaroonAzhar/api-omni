import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { OriginationChecklistModule } from '../origination-checklist.module';
import { OriginationChecklistLandChargesController } from './origination-checklist-land-charges.controller';
import { OriginationChecklistLandChargesRepository } from './origination-checklist-land-charges.repository';
import {
  OriginationChecklistLandChargesService,
  OriginationChecklistLandChargesRepositoryInterface,
} from './origination-checklist-land-charges.service';
import { AddResultHandler } from './handlers/add-result.handler';
import { AddedResultHandler } from './handlers/added-result.handler';
import { MarkCheckFacilityLetterHandler } from './handlers/mark-check-facility-letter.handler';
import { CheckFacilityLetterHandler } from './handlers/check-facility-letter.handler';
import { UpdatedResultHandler } from './handlers/updated-result.handler';
import { UpdateResultHandler } from './handlers/update-result.handler';

const CommandHandlers = [AddResultHandler, MarkCheckFacilityLetterHandler, UpdateResultHandler];
const EventHandlers = [AddedResultHandler, CheckFacilityLetterHandler, UpdatedResultHandler];

@Module({
  controllers: [OriginationChecklistLandChargesController],
  providers: [
    OriginationChecklistLandChargesService,
    {
      provide: OriginationChecklistLandChargesRepositoryInterface,
      useClass: OriginationChecklistLandChargesRepository,
    },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [OriginationChecklistLandChargesService],
  imports: [forwardRef(() => OriginationChecklistModule), CqrsModule, EventsModule, CommandsModule],
})
export class OriginationChecklistLandChargesModule {}

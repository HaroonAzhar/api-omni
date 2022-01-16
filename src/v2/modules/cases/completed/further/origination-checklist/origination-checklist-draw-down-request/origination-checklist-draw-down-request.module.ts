import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { OriginationChecklistModule } from '../origination-checklist.module';
import { SavedSignatoriesHandler } from './handlers/saved-signatories.handler';
import { OriginationChecklistDrawDownRequestController } from './origination-checklist-draw-down-request.controller';
import { OriginationChecklistDrawDownRequestRepository } from './origination-checklist-draw-down-request.repository';
import {
  OriginationChecklistDrawDownRequestService,
  OriginationChecklistDrawDownRequestRepositoryInterface,
} from './origination-checklist-draw-down-request.service';
import { MarkAmountMatchesHandler } from './handlers/mark-amount-matches.handler';
import { SaveSignatoriesHandler } from './handlers/save-signatories.handler';
import { AmountMatchesHandler } from './handlers/amount-matches.handler';

const CommandHandlers = [MarkAmountMatchesHandler, SaveSignatoriesHandler];
const EventHandlers = [AmountMatchesHandler, SavedSignatoriesHandler];

@Module({
  controllers: [OriginationChecklistDrawDownRequestController],
  providers: [
    OriginationChecklistDrawDownRequestService,
    {
      provide: OriginationChecklistDrawDownRequestRepositoryInterface,
      useClass: OriginationChecklistDrawDownRequestRepository,
    },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [OriginationChecklistDrawDownRequestService],
  imports: [forwardRef(() => OriginationChecklistModule), CqrsModule, EventsModule, CommandsModule],
})
export class OriginationChecklistDrawDownRequestModule {}

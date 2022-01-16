import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { OriginationChecklistModule } from '../origination-checklist.module';
import { OriginationChecklistReinspectionValuationController } from './origination-checklist-reinspection-valuation.controller';
import { OriginationChecklistReinspectionValuationRepository } from './origination-checklist-reinspection-valuation.repository';
import {
  OriginationChecklistReinspectionValuationService,
  OriginationChecklistReinspectionValuationRepositoryInterface,
} from './origination-checklist-reinspection-valuation.service';
import { MarkAddressedToCorrectHandler } from './handlers/mark-addressed-to-correct.handler';
import { MarkAddressMatchesHandler } from './handlers/mark-address-matches.handler';
import { MarkValuerOnApprovedHandler } from './handlers/mark-valuer-on-approved.handler';
import { MarkSignedAndDatedHandler } from './handlers/mark-signed-and-dated.handler';
import { MarkWithin3MonthsHandler } from './handlers/mark-within-3-months.handler';
import { SignedAndDatedHandler } from './handlers/signed-and-dated.handler';
import { ValuerOnApprovedHandler } from './handlers/valuer-on-approved.handler';
import { AddressMatchesHandler } from './handlers/address-matches.handler';
import { AddressedToCorrectHandler } from './handlers/addressed-to-correct.handler';
import { Within3MonthsHandler } from './handlers/within-3-months.handler';

const CommandHandlers = [
  MarkAddressedToCorrectHandler,
  MarkAddressMatchesHandler,
  MarkValuerOnApprovedHandler,
  MarkSignedAndDatedHandler,
  MarkWithin3MonthsHandler,
];
const EventHandlers = [
  AddressedToCorrectHandler,
  AddressMatchesHandler,
  SignedAndDatedHandler,
  Within3MonthsHandler,
  ValuerOnApprovedHandler,
];

@Module({
  controllers: [OriginationChecklistReinspectionValuationController],
  providers: [
    OriginationChecklistReinspectionValuationService,
    {
      provide: OriginationChecklistReinspectionValuationRepositoryInterface,
      useClass: OriginationChecklistReinspectionValuationRepository,
    },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [OriginationChecklistReinspectionValuationService],
  imports: [forwardRef(() => OriginationChecklistModule), CqrsModule, EventsModule, CommandsModule],
})
export class OriginationChecklistReinspectionValuationModule {}

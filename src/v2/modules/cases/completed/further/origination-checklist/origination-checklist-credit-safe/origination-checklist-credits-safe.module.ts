import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { OriginationChecklistModule } from '../origination-checklist.module';
import { OriginationChecklistCreditSafeController } from './origination-checklist-credit-safe.controller';
import { OriginationChecklistCreditSafeRepository } from './origination-checklist-credit-safe.repository';
import {
  OriginationChecklistCreditSafeService,
  OriginationChecklistCreditSafeRepositoryInterface,
} from './origination-checklist-credit-safe.service';
import { MarkNameMatchesHandler } from './handlers/mark-name-matches.handler';
import { NameMatchesHandler } from './handlers/name-matches.handler';
import { MarkDirectorsSameHandler } from './handlers/mark-directors-same.handler';
import { MarkNoCCJHandler } from './handlers/mark-no-ccj.handler';
import { EnsureNoCCJHandler } from './handlers/ensure-no-ccj.handler';
import { DirectorsListedTheSameHandler } from './handlers/directors-listed-same.handler';

const CommandHandlers = [MarkNameMatchesHandler, MarkDirectorsSameHandler, MarkNoCCJHandler];
const EventHandlers = [NameMatchesHandler, EnsureNoCCJHandler, DirectorsListedTheSameHandler];

@Module({
  controllers: [OriginationChecklistCreditSafeController],
  providers: [
    OriginationChecklistCreditSafeService,
    {
      provide: OriginationChecklistCreditSafeRepositoryInterface,
      useClass: OriginationChecklistCreditSafeRepository,
    },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [OriginationChecklistCreditSafeService],
  imports: [forwardRef(() => OriginationChecklistModule), CqrsModule, EventsModule, CommandsModule],
})
export class OriginationChecklistCreditSafeModule {}

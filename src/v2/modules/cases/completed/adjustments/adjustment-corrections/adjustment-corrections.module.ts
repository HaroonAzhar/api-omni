import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { CreateAdjustmentCorrectionHandler } from './handlers/create-adjustment-correction-command.handler';
import { CreatedAdjustmentCorrectionHandler } from './handlers/created-adjustment-correction-event.handler';
import { AdjustmentCorrectionsController } from './adjustment-corrections.controller';
import { AdjustmentCorrectionsRepository } from './adjustment-corrections.repository';
import {
  AdjustmentCorrectionsService,
  AdjustmentCorrectionsRepositoryInterface,
} from './adjustment-corrections.service';

const CommandHandlers = [CreateAdjustmentCorrectionHandler];
const EventHandlers = [CreatedAdjustmentCorrectionHandler];

@Module({
  controllers: [AdjustmentCorrectionsController],
  providers: [
    AdjustmentCorrectionsService,
    { provide: AdjustmentCorrectionsRepositoryInterface, useClass: AdjustmentCorrectionsRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [AdjustmentCorrectionsService],
  imports: [CqrsModule, CommandsModule, EventsModule],
})
export class AdjustmentCorrectionsModule {}

import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { OriginationChecklistModule } from '../origination-checklist.module';
import { OriginationChecklistExperianController } from './origination-checklist-experian.controller';
import { OriginationChecklistExperianRepository } from './origination-checklist-experian.repository';
import {
  OriginationChecklistExperianService,
  OriginationChecklistExperianRepositoryInterface,
} from './origination-checklist-experian.service';

@Module({
  controllers: [OriginationChecklistExperianController],
  providers: [
    OriginationChecklistExperianService,
    { provide: OriginationChecklistExperianRepositoryInterface, useClass: OriginationChecklistExperianRepository },
  ],
  exports: [OriginationChecklistExperianService],
  imports: [forwardRef(() => OriginationChecklistModule), CqrsModule, EventsModule, CommandsModule],
})
export class OriginationChecklistExperianModule {}

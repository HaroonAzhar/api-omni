import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { OriginationChecklistModule } from '../origination-checklist.module';
import { OriginationChecklistAmlController } from './origination-checklist-aml.controller';
import { OriginationChecklistAmlRepository } from './origination-checklist-aml.repository';
import {
  OriginationChecklistAmlService,
  OriginationChecklistAmlRepositoryInterface,
} from './origination-checklist-aml.service';

@Module({
  controllers: [OriginationChecklistAmlController],
  providers: [
    OriginationChecklistAmlService,
    { provide: OriginationChecklistAmlRepositoryInterface, useClass: OriginationChecklistAmlRepository },
  ],
  exports: [OriginationChecklistAmlService],
  imports: [forwardRef(() => OriginationChecklistModule), CqrsModule, EventsModule, CommandsModule],
})
export class OriginationChecklistAmlModule {}

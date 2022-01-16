import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { OriginationChecklistModule } from '../origination-checklist.module';
import { OriginationChecklistDocumentsController } from './origination-checklist-documents.controller';
import { OriginationChecklistDocumentsRepository } from './origination-checklist-documents.repository';
import {
  OriginationChecklistDocumentsService,
  OriginationChecklistDocumentsRepositoryInterface,
} from './origination-checklist-documents.service';

@Module({
  controllers: [OriginationChecklistDocumentsController],
  providers: [
    OriginationChecklistDocumentsService,
    { provide: OriginationChecklistDocumentsRepositoryInterface, useClass: OriginationChecklistDocumentsRepository },
  ],
  exports: [OriginationChecklistDocumentsService],
  imports: [forwardRef(() => OriginationChecklistModule), CqrsModule, EventsModule, CommandsModule],
})
export class OriginationChecklistDocumentsModule {}

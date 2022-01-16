import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { OriginationChecklistModule } from '../origination-checklist.module';
import { EditCommentsOriginationChecklistSolicitorCommandHandler } from './handlers/edit-comments-origination-checklist-solicitor.handler';
import { EditedCommentOriginationChecklistSolicitorHandler } from './handlers/edited-comments-origination-checklist-solicitor.handler';
import { OriginationChecklistSolicitorController } from './origination-checklist-solicitor.controller';
import { OriginationChecklistSolicitorRepository } from './origination-checklist-solicitor.repository';
import {
  OriginationChecklistSolicitorService,
  OriginationChecklistSolicitorRepositoryInterface,
} from './origination-checklist-solicitor.service';

const CommandHandlers = [EditCommentsOriginationChecklistSolicitorCommandHandler];
const EventHandlers = [EditedCommentOriginationChecklistSolicitorHandler];

@Module({
  controllers: [OriginationChecklistSolicitorController],
  providers: [
    OriginationChecklistSolicitorService,
    { provide: OriginationChecklistSolicitorRepositoryInterface, useClass: OriginationChecklistSolicitorRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [OriginationChecklistSolicitorService],
  imports: [forwardRef(() => OriginationChecklistModule), CqrsModule, EventsModule, CommandsModule],
})
export class OriginationChecklistSolicitorModule {}

import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { CompletedModule } from '../completed.module';
import { DefaultEventsController } from './default-events.controller';
import { DefaultEventsRepository } from './default-events.repository';
import { DefaultEventsService } from './default-events.service';
import { DefaultEventsRepositoryInterface } from './default-event.interface';
import { CreateDefaultEventHandler } from './handlers/create-default-event-command.handler';
import { CreatedDefaultEventHandler } from './handlers/created-default-event-event.handler';
import { DeleteDefaultEventHandler } from './handlers/delete-default-event-command.handler';
import { DeletedDefaultEventHandler } from './handlers/deleted-default-event-event.handler';

export const CommandHandlers = [CreateDefaultEventHandler, DeleteDefaultEventHandler];
export const EventsHandlers = [CreatedDefaultEventHandler, DeletedDefaultEventHandler];

@Module({
  controllers: [DefaultEventsController],
  providers: [
    DefaultEventsService,
    { provide: DefaultEventsRepositoryInterface, useClass: DefaultEventsRepository },
    ...CommandHandlers,
    ...EventsHandlers,
  ],
  exports: [DefaultEventsService],
  imports: [forwardRef(() => CompletedModule), CqrsModule, CommandsModule, EventsModule],
})
export class DefaultEventsModule {}

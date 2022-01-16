import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { CompletedModule } from '../completed.module';
import { ManualStatusesController } from './manual-statuses.controller';
import { ManualStatusesRepository } from './manual-statuses.repository';
import { ManualStatusesService } from './manual-statuses.service';
import { ManualStatusesRepositoryInterface } from './manual-status.interface';
import { CreateManualStatusCommandHandler } from './handlers/create-manual-status-command.handler';
import { CreatedManualStatusHandler } from './handlers/created-manual-status-event.handler';
import { DeletedManualStatusHandler } from './handlers/deleted-manual-status-event.handler';
import { DeleteManualStatusCommandHandler } from './handlers/delete-manual-status-command.handler';

export const CommandHandlers = [CreateManualStatusCommandHandler, DeleteManualStatusCommandHandler];
export const EventsHandlers = [CreatedManualStatusHandler, DeletedManualStatusHandler];

@Module({
  controllers: [ManualStatusesController],
  providers: [
    ManualStatusesService,
    { provide: ManualStatusesRepositoryInterface, useClass: ManualStatusesRepository },
    ...CommandHandlers,
    ...EventsHandlers,
  ],
  exports: [ManualStatusesService],
  imports: [forwardRef(() => CompletedModule), CqrsModule, CommandsModule, EventsModule],
})
export class ManualStatusesModule {}

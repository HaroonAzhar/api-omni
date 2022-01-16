import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { CompletedModule } from '../completed.module';
import { CreateFurtherAdvanceHandler } from './handlers/create-further-advance-command.handler';
import { CreatedFurtherAdvanceHandler } from './handlers/created-further-advance-event.handler';
import { FurtherAdvancesController } from './further-advances.controller';
import { FurtherAdvancesRepository } from './further-advances.repository';
import { FurtherAdvancesService, FurtherAdvancesRepositoryInterface } from './further-advances.service';
import { OriginationChecklistModule } from '../further/origination-checklist/origination-checklist.module';
import { UnderwriterFlowModule } from '../further/underwriter-flow/underwriter-flow.module';

const CommandHandlers = [CreateFurtherAdvanceHandler];
const EventHandlers = [CreatedFurtherAdvanceHandler];

@Module({
  controllers: [FurtherAdvancesController],
  providers: [
    FurtherAdvancesService,
    { provide: FurtherAdvancesRepositoryInterface, useClass: FurtherAdvancesRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [FurtherAdvancesService],
  imports: [
    forwardRef(() => CompletedModule),
    CqrsModule,
    CommandsModule,
    EventsModule,
    OriginationChecklistModule,
    UnderwriterFlowModule,
  ],
})
export class FurtherAdvancesModule {}

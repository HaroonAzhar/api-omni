import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { CompletedModule } from '../completed.module';
import { CreateFurtherDrawdownHandler } from './handlers/create-further-drawdown-command.handler';
import { CreatedFurtherDrawdownHandler } from './handlers/created-further-drawdown-event.handler';
import { FurtherDrawdownsController } from './further-drawdowns.controller';
import { FurtherDrawdownsRepository } from './further-drawdowns.repository';
import { FurtherDrawdownsService, FurtherDrawdownsRepositoryInterface } from './further-drawdowns.service';
import { OriginationChecklistModule } from '../further/origination-checklist/origination-checklist.module';
import { UnderwriterFlowModule } from '../further/underwriter-flow/underwriter-flow.module';
import { DipModule } from '../../dip/dip.module';
import { CasesModule } from '../../cases.module';

const CommandHandlers = [CreateFurtherDrawdownHandler];
const EventHandlers = [CreatedFurtherDrawdownHandler];

@Module({
  controllers: [FurtherDrawdownsController],
  providers: [
    FurtherDrawdownsService,
    { provide: FurtherDrawdownsRepositoryInterface, useClass: FurtherDrawdownsRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [FurtherDrawdownsService],
  imports: [
    forwardRef(() => CompletedModule),
    CqrsModule,
    CommandsModule,
    EventsModule,
    OriginationChecklistModule,
    UnderwriterFlowModule,
    forwardRef(() => CasesModule),
    DipModule,
  ],
})
export class FurtherDrawdownsModule {}

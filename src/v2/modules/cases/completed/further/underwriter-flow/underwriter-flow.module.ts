import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventsModule } from '@v2/utils/events';
import { CommandsModule } from '@v2/utils/commands';

import { UnderwriterFlowRepository } from './underwriter-flow.repository';
import { UnderwriterFlowService } from './underwriter-flow.service';
import { UnderwriterFlowController } from './underwriter-flow.controller';
import { UnderwriterFlowRepositoryInterface } from './underwriter-flow.interface';
import { ApprovedUnderwriterFlowHandler } from './handlers/approved-underwriter-flow.handler';
import { ReturnUnderwriterFlowHandler } from './handlers/return-underwriter-flow.handler';
import { UpdateUnderwriterFlowHandler } from './handlers/update-underwriter-flow.handler';
import { ApproveUnderwriterFlowHandler } from './handlers/approve-underwriter-flow.handler';
import { ReturnedUnderwriterFlowHandler } from './handlers/returned-underwriter-flow.handler';
import { UpdatedUnderwriterFlowHandler } from './handlers/updated-underwriter-flow.handler';

const CommandHandlers = [ApproveUnderwriterFlowHandler, ReturnUnderwriterFlowHandler, UpdateUnderwriterFlowHandler];
const EventHandlers = [ApprovedUnderwriterFlowHandler, ReturnedUnderwriterFlowHandler, UpdatedUnderwriterFlowHandler];
@Module({
  controllers: [UnderwriterFlowController],
  providers: [
    UnderwriterFlowService,
    { provide: UnderwriterFlowRepositoryInterface, useClass: UnderwriterFlowRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [UnderwriterFlowService],
  imports: [CqrsModule, EventsModule, CommandsModule],
})
export class UnderwriterFlowModule {}

import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { CompletedModule } from '../completed.module';
import { CreateCashflowHandler } from './handlers/create-cashflow-command.handler';
import { CreatedCashflowHandler } from './handlers/created-cashflow-event.handler';
import { CashflowsController } from './cashflows.controller';
import { CashflowsRepository } from './cashflows.repository';
import { CashflowsService, CashflowsRepositoryInterface } from './cashflows.service';

const CommandHandlers = [CreateCashflowHandler];
const EventHandlers = [CreatedCashflowHandler];

@Module({
  controllers: [CashflowsController],
  providers: [
    CashflowsService,
    { provide: CashflowsRepositoryInterface, useClass: CashflowsRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [CashflowsService],
  imports: [forwardRef(() => CompletedModule), CqrsModule, CommandsModule, EventsModule],
})
export class CashflowsModule {}

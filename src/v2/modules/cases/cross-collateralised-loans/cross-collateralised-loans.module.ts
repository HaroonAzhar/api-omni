import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { CreateCrossCollateralisedLoanHandler } from './handlers/create-cross-collateralised-loan-command.handler';
import { CreatedCrossCollateralisedLoanHandler } from './handlers/created-cross-collateralised-loan-event.handler';
import { CrossCollateralisedLoansController } from './cross-collateralised-loans.controller';
import { CrossCollateralisedLoansRepository } from './cross-collateralised-loans.repository';
import {
  CrossCollateralisedLoansService,
  CrossCollateralisedLoansRepositoryInterface,
} from './cross-collateralised-loans.service';
import { DeleteCrossCollateralisedLoanHandler } from './handlers/delete-cross-collateralised-loan-command.handler';
import { DeletedCrossCollateralisedLoanHandler } from './handlers/deleted-cross-collateralised-loan-event.handler';
import { CasesModule } from '../cases.module';
import { CompletedModule } from '../completed/completed.module';

const CommandHandlers = [CreateCrossCollateralisedLoanHandler, DeleteCrossCollateralisedLoanHandler];
const EventHandlers = [CreatedCrossCollateralisedLoanHandler, DeletedCrossCollateralisedLoanHandler];

@Module({
  controllers: [CrossCollateralisedLoansController],
  providers: [
    CrossCollateralisedLoansService,
    { provide: CrossCollateralisedLoansRepositoryInterface, useClass: CrossCollateralisedLoansRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [CrossCollateralisedLoansService],
  imports: [forwardRef(() => CasesModule), CqrsModule, CommandsModule, EventsModule, CompletedModule],
})
export class CrossCollateralisedLoansModule {}

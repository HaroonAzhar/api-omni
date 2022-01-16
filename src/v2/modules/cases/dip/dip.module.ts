import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ContactsModule } from '@v2/modules/admin/contacts/contacts.module';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { CasesModule } from '../cases.module';
import { DipController } from './dip.controller';
import { DipRepository } from './dip.repository';
import { DipService, DipRepositoryInterface } from './dip.service';
import { ChangeAdvanceTypeCommandHandler } from './handlers/change-advance-type-command.handler';
import { ChangeBuildingTypeCommandHandler } from './handlers/change-building-type-command.handler';
import { ChangeContactCommandHandler } from './handlers/change-contact-command.handler';
import { ChangeFinancialCalculatorDetailsCommandHandler } from './handlers/change-financial-calculator-details-command.handler';
import { ChangeFinancialDetailsCommandHandler } from './handlers/change-financial-details-command.handler';
import { ChangeIntroducerDetailsCommandHandler } from './handlers/change-introducer-details-command.handler';
import { ChangeIntroducerTypeCommandHandler } from './handlers/change-introducer-type-command.handler';
import { ChangeLoanDetailsCommandHandler } from './handlers/change-loan-details-command.handler';
import { ChangeSecuritiesCommandHandler } from './handlers/change-securities-command.handler';
import { ChangedAdvanceTypeEventHandler } from './handlers/changed-advance-type-event.handler';
import { ChangedBuildingTypeEventHandler } from './handlers/changed-building-type-event.handler';
import { ChangedContactEventHandler } from './handlers/changed-contact-event.handler';
import { ChangedFinancialCalculatorDetailsEventHandler } from './handlers/changed-financial-calculator-details-event.handler';
import { ChangedFinancialDetailsEventHandler } from './handlers/changed-financial-details-event.handler';
import { ChangedIntroducerDetailsEventHandler } from './handlers/changed-introducer-details-event.handler';
import { ChangedIntroducerTypeEventHandler } from './handlers/changed-introducer-type-event.handler';
import { ChangedLoanDetailsEventHandler } from './handlers/changed-loan-detail-event.handler';
import { ChangedSecuritiesEventHandler } from './handlers/changed-securities-event.handler';

export const CommandHandlers = [
  ChangeIntroducerTypeCommandHandler,
  ChangeIntroducerDetailsCommandHandler,
  ChangeAdvanceTypeCommandHandler,
  ChangeContactCommandHandler,
  ChangeBuildingTypeCommandHandler,
  ChangeSecuritiesCommandHandler,
  ChangeLoanDetailsCommandHandler,
  ChangeFinancialDetailsCommandHandler,
  ChangeFinancialCalculatorDetailsCommandHandler,
];
export const EventsHandlers = [
  ChangedIntroducerTypeEventHandler,
  ChangedIntroducerDetailsEventHandler,
  ChangedAdvanceTypeEventHandler,
  ChangedContactEventHandler,
  ChangedBuildingTypeEventHandler,
  ChangedSecuritiesEventHandler,
  ChangedLoanDetailsEventHandler,
  ChangedFinancialDetailsEventHandler,
  ChangedFinancialCalculatorDetailsEventHandler,
];
@Module({
  providers: [
    DipService,
    { provide: DipRepositoryInterface, useClass: DipRepository },
    ...CommandHandlers,
    ...EventsHandlers,
  ],
  exports: [DipService],
  controllers: [DipController],
  imports: [forwardRef(() => CasesModule), CqrsModule, CommandsModule, EventsModule, ContactsModule],
})
export class DipModule {}

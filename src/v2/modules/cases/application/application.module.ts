import { Module } from '@nestjs/common';

import { DipModule } from '../dip/dip.module';
import { ApplicationRepository } from './application.repository';
import { ApplicationService } from './application.service';
import { ApplicationRepositoryInterface } from './application.interface';
import { ChangedDipIntroducerTypeEventHandler } from './handlers/changed-dip-introducer-type-event.handler';
import { ChangedDipIntroducerDetailsEventHandler } from './handlers/changed-dip-introducer-details-event.handler';
import { ChangedDipAdvanceTypeEventHandler } from './handlers/changed-dip-advance-type-event.handler';
import { ChangedDipContactEventHandler } from './handlers/changed-dip-contact-event.handler';
import { ChangedDipBuildingTypeEventHandler } from './handlers/changed-dip-building-type-event.handler';
import { ChangedDipSecuritiesEventHandler } from './handlers/changed-dip-securities-event.handler';
import { ChangedDipLoanDetailsEventHandler } from './handlers/changed-dip-loan-details-event.handler';
import { ChangedDipFinancialDetailsEventHandler } from './handlers/changed-dip-financial-details-event.handler';
import { ChangedDipFinancialCalculatorDetailsEventHandler } from './handlers/changed-dip-financial-calculator-details-event.handler';

export const EventHandlers = [
  ChangedDipIntroducerTypeEventHandler,
  ChangedDipIntroducerDetailsEventHandler,
  ChangedDipAdvanceTypeEventHandler,
  ChangedDipContactEventHandler,
  ChangedDipBuildingTypeEventHandler,
  ChangedDipSecuritiesEventHandler,
  ChangedDipLoanDetailsEventHandler,
  ChangedDipFinancialDetailsEventHandler,
  ChangedDipFinancialCalculatorDetailsEventHandler,
];
@Module({
  providers: [
    ApplicationService,
    { provide: ApplicationRepositoryInterface, useClass: ApplicationRepository },
    ...EventHandlers,
  ],
  exports: [ApplicationService],
  imports: [DipModule],
})
export class ApplicationModule {}

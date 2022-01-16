import { Module } from '@nestjs/common';

import { AvailableFundingService } from './available-funding.service';
import { AvailableFundingController } from './available-funding.controller';
import { ExpectedDrawdownsModule } from '../cases/completed/expected-drawdowns/expected-drawdowns.module';
import { EstimatedRedemptionsModule } from '../cases/completed/estimated-redemptions/estimated-redemptions.module';
import { AdjustmentsModule } from '../cases/completed/adjustments/adjustments.module';
import { CaseSummaryModule } from '../cases/case-summary/case-summary.module';
import { StoredCashflowModule } from '../stored-cashflows/stored-cashflows.module';

@Module({
  providers: [AvailableFundingService],
  controllers: [AvailableFundingController],
  imports: [
    ExpectedDrawdownsModule,
    EstimatedRedemptionsModule,
    AdjustmentsModule,
    CaseSummaryModule,
    StoredCashflowModule,
  ],
})
export class AvailableFundingModule {}

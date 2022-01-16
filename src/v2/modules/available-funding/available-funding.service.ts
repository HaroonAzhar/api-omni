import { Injectable } from '@nestjs/common';

import { CaseSummaryService } from '../cases/case-summary/case-summary.service';
import { AdjustmentsService } from '../cases/completed/adjustments/adjustments.service';
import { EstimatedRedemptionsService } from '../cases/completed/estimated-redemptions/estimated-redemptions.service';
import { ExpectedDrawdownsService } from '../cases/completed/expected-drawdowns/expected-drawdowns.service';
import { StoredCashflowsService } from '../stored-cashflows/stored-cashflows.service';
import { AvailableFunding, AvailableFundingFilterQuery } from './available-funding.interface';

@Injectable()
export class AvailableFundingService {
  constructor(
    private readonly expectedDrawdownsService: ExpectedDrawdownsService,
    private readonly estimatedRedemptionsService: EstimatedRedemptionsService,
    private readonly adjustmentsService: AdjustmentsService,
    private readonly caseSummayService: CaseSummaryService,
    private readonly storedCashflowsService: StoredCashflowsService
  ) {}

  async get(query?: AvailableFundingFilterQuery): Promise<AvailableFunding> {
    const expectedDrawdowns = await this.expectedDrawdownsService.getForDates(query.dateMin, query.dateMax);
    const estimatedRedemptions = await this.estimatedRedemptionsService.getForDates(query.dateMin, query.dateMax);
    const serviceInterestPayments = await this.adjustmentsService.getForDatesAndType({
      ActualDateMin: query.dateMin,
      ActualDateMax: query.dateMax,
      TransactionType: 'Service Interest Payment',
    });

    const expectedCompletions = await this.caseSummayService.getExpectedCompletions(query.dateMin, query.dateMax);
    const storedCashflows = await this.storedCashflowsService.findInRange(query.dateMin, query.dateMax);
    return { expectedDrawdowns, estimatedRedemptions, serviceInterestPayments, expectedCompletions, storedCashflows };
  }
}

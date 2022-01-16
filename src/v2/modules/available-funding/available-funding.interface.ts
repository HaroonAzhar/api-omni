import { ExpectedCompletion } from '../cases/case-summary/case-summary.interface';
import { Adjustment } from '../cases/completed/adjustments/adjustment.interface';
import { EstimatedRedemption } from '../cases/completed/estimated-redemptions/estimated-redemption.interface';
import { ExpectedDrawdown } from '../cases/completed/expected-drawdowns/expected-drawdown.interface';
import { StoredCashflow } from '../stored-cashflows/stored-cashflow.interface';

export type AvailableFunding = {
  expectedCompletions: ExpectedCompletion[];
  serviceInterestPayments: Adjustment[];
  expectedDrawdowns: ExpectedDrawdown[];
  estimatedRedemptions: EstimatedRedemption[];
  storedCashflows: StoredCashflow[];
};

export interface AvailableFundingFilterQuery {
  dateMin: string;
  dateMax: string;
}

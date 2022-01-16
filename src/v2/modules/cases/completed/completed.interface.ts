import { Adjustment } from './adjustments/adjustment.interface';
import { DefaultEvent, DefaultEventPeriod } from './default-events/default-event.interface';
import { Extension } from './extensions/extension.interface';
import { FurtherDrawdown } from './further-drawdowns/further-drawdown.interface';
import { ManualStatus } from './manual-statuses/manual-status.interface';
import { Cashflow } from './cashflows/cashflow.interface';
import { Security } from './securities/security.interface';

export const completedStatuses = [
  'Performing',
  'Non-Performing – Delinquent',
  'Non-Performing – Arrears',
  'Non-Performing – Default',
  'Non-Performing – Called In',
] as const;
export type CompletedStatus = typeof completedStatuses[number];

export interface Completed {
  CompletedId?: number;
  FkCaseId: number;
  DateOfCompletion: string;
  DateOfMaturity?: string;
  status?: CompletedStatus;
  automaticStatus?: CompletedStatus;
  currentInterestRate?: number;
  currentDateOfMaturity?: string;
  extensions?: Extension[];
  defaultEvents?: DefaultEvent[];
  manualStatuses?: ManualStatus[];
  lastStatus?: ManualStatus;
  furtherDrawdowns?: FurtherDrawdown[];
  availableDrawdownFunds?: number;
  adjustments?: Adjustment[];
  cashflows?: Cashflow[];
  securities?: Security[];
  defaultEventsPeriods?: DefaultEventPeriod[];
}

export type CreateCompleted = CreateCompletedParams & {
  FkCaseId: number;

  DateOfMaturity?: string;
};

export type CreateCompletedParams = {
  readonly DateOfCompletion: string;

  readonly AddWaypointForRedemptionDueDate?: boolean;

  readonly AddWaypointForRedemptionDueDateDate?: string;

  readonly AddWaypointForSendStandingOrderInstruction?: boolean;

  readonly AddWaypointForSendStandingOrderInstructionDate?: string;

  readonly AddWaypointForServicedInterestPaymentDue?: boolean;

  readonly AddWaypointForServicedInterestPaymentDueDate?: string;

  readonly AddWaypointForReviewExitStrategy?: boolean;

  readonly AddWaypointForReviewExitStrategyDate?: string;
};

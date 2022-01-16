import { User } from '../admin/users/user.interface';
import { Application } from './application/application.interface';
import { CaseSummary } from './case-summary/case-summary.interface';
import { Completed } from './completed/completed.interface';
import { Dip } from './dip/dip.interface';
import { Tag } from '../admin/tags/tag.interface';
import { CrossCollateralisedLoan } from './cross-collateralised-loans/cross-collateralised-loan.interface';

export const stages = ['dip', 'enquiry', 'case_summary', 'completed', 'redeemed'] as const;

export type Stage = typeof stages[number];

export const statuses = [
  'pending',
  'received',
  'withdrawn',
  'issued',
  'expired',
  'received',
  'in_progress',
  'ready_to_check',
  'checked',
  'awaiting_application',
  'not_proceeding',
  'live',
  'with_shortfall',
  'in_full',
  'on_hold',
] as const;

export type Status = typeof statuses[number];

export interface Case {
  Id?: string;
  CaseId?: number;
  Stage?: Stage;
  completed?: Completed;
  dip?: Dip;
  application?: Application;
  CaseNr?: string;
  Status?: Status;
  FkCaseStatusId?: number;
  Applicants?: string;
  FkAssignedUserId?: number;
  assignedUser?: User;
  caseSummary?: CaseSummary;
  associatedTags?: Tag[];
  crossCollateralisedLoans?: CrossCollateralisedLoan[];
}

import { Underwriter } from '@v2/modules/admin/underwriters/underwriter.interface';

export type CaseSummary = CaseSummaryEntity & {
  riskAndMitigation?: string[];
  underwriter?: Underwriter;
};

export type UpdateCaseSummary = {
  ExpectedCompletionDate: string;
};

export type CaseSummaryEntity = {
  CaseOverviewId: number;
  FkCaseId: number;
} & Required<UpdateCaseSummaryEntity>;

export type UpdateCaseSummaryEntity = {
  Risk?: string;
  Underwriter?: number;
  ExpectedCompletionDate?: string;
};

export type ExpectedCompletion = {
  netDayOne: number;
  fees: number;
  brokerFee?: number;
};

import { OriginationChecklist } from '../further/origination-checklist/origination-checklist.interface';
import { UnderwriterFlow } from '../further/underwriter-flow/underwriter-flow.interface';

export type FurtherAdvanceEntity = {
  FurtherAdvanceId: number;
  FkCompletedId: number;

  RequestedAmount: number;
  CumulativeBalance: number;

  TotalValuations: number;
  TotalGDV: number;

  LTV: number;
  LTGDV: number;

  RequestedDate: string;

  Notes?: string;

  CreatedDate: string;
  CreatedBy: string;
};

export type CreateFurtherAdvanceEntity = Omit<FurtherAdvanceEntity, 'FurtherAdvanceId' | 'CreatedDate'>;

export type FurtherAdvance = FurtherAdvanceEntity & {
  originationChecklist: OriginationChecklist;
  underwriterFlow: UnderwriterFlow;
};

export type CreateFurtherAdvance = Omit<CreateFurtherAdvanceEntity, 'FkCompletedId'>;

export const moduleName = 'further-advances';

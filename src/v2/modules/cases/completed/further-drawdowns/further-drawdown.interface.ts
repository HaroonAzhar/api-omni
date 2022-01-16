import { OriginationChecklist } from '../further/origination-checklist/origination-checklist.interface';
import { UnderwriterFlow } from '../further//underwriter-flow/underwriter-flow.interface';

export type FurtherDrawdownEntity = {
  FurtherDrawdownId: number;
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

export type CreateFurtherDrawdownEntity = Omit<FurtherDrawdownEntity, 'FurtherDrawdownId' | 'CreatedDate'>;

export type FurtherDrawdown = FurtherDrawdownEntity & {
  originationChecklist: OriginationChecklist;
  underwriterFlow: UnderwriterFlow;
  remainingFunds: number;
};

export type CreateFurtherDrawdown = Omit<CreateFurtherDrawdownEntity, 'FkCompletedId'>;

export const moduleName = 'further-drawdowns';

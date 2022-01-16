export interface Cashflow {
  CashflowId?: number;
  FkCompletedId?: number;
  Amount: number;
  Description?: string;
  ActualDate: string;
  CreatedDate?: string;
  CreatedBy?: string;
}

export interface CashflowsFilterQuery {
  ActualDateMin?: string;
  ActualDateMax?: string;
}

export const moduleName = 'cashflows';

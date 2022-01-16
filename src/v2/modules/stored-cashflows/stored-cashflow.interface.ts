export type CreateStoredCashflow = {
  TransactionDate: string;
  Amount: number;
  FkFundId: number;
};

export type StoredCashflow = CreateStoredCashflow & {
  CreatedDate: string;
  CreatedBy: string;
};

export type StoredCashflowEntity = StoredCashflow & {
  StoredCashflowId: number;
};

export type CreateStoredCashflowEntity = CreateStoredCashflow & Pick<StoredCashflow, 'CreatedBy'>;

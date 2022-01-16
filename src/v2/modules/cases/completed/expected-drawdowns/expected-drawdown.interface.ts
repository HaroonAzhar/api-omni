export type ExpectedDrawdownEntity = {
  ExpectedDrawdownId: number;
  FkCompletedId: number;

  Date: string;
  Amount: number;

  CreatedDate: string;
  CreatedBy: string;
};

export type CreateExpectedDrawdownEntity = Omit<ExpectedDrawdownEntity, 'ExpectedDrawdownId' | 'CreatedDate'>;

export type ExpectedDrawdown = ExpectedDrawdownEntity;

export type CreateExpectedDrawdown = Omit<CreateExpectedDrawdownEntity, 'FkCompletedId'>;

export type UpdateExpectedDrawdown = Partial<ExpectedDrawdown>;

export type UpdateExpectedDrawdownEntity = Partial<Omit<ExpectedDrawdownEntity, 'ExpectedDrawdownId'>> & {
  ExpectedDrawdownId: number;
};

export const moduleName = 'expected-drawdowns';

export type DeleteExpectedDrawdown = {
  ExpectedDrawdownId: number;
};

import { Stage } from '../case.interface';

export type CrossCollateralisedLoan = {
  CrossCollateralisedLoanId: number;

  FkCaseId: number;
  FkOtherCaseId: number;

  caseUuid: string;
  caseRef: string;
  stage: Stage;
  status: string;

  CreatedDate: string;
  CreatedBy: string;
};

export type CreateCrossCollateralisedLoan = {
  otherCaseUuid: string;
};

export type DeleteCrossCollateralisedLoan = CreateCrossCollateralisedLoan & { caseUuid?: string };

export const moduleName = 'cross-collateralised-loans';

export type CrossCollateralisedLoanEntity = Omit<CrossCollateralisedLoan, 'caseUuid' | 'caseRef' | 'stage' | 'status'>;

export type CreateCrossCollateralisedLoanEntity = Omit<
  CrossCollateralisedLoanEntity,
  'CrossCollateralisedLoanId' | 'CreatedDate'
>;

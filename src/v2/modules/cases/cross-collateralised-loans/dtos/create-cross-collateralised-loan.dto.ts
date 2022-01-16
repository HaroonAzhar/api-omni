import { IsString } from 'class-validator';

import { CreateCrossCollateralisedLoan } from '../cross-collateralised-loan.interface';

export class CreateCrossCollateralisedLoanDto implements Omit<CreateCrossCollateralisedLoan, 'CreatedBy'> {
  @IsString()
  otherCaseUuid: string;
}

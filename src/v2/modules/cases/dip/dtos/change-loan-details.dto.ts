import { Type } from 'class-transformer';
import { IsString, IsIn, IsNumber, IsPositive, Max } from 'class-validator';

import { LoanType, loanTypes } from '../../types/loan-type/loan-type.interface';
import { ChangeLoanDetailsCommandContent, LoanPurpose, loanPurposes } from '../dip.interface';

export class ChangeLoanDetailsDto implements ChangeLoanDetailsCommandContent {
  @IsString()
  @IsIn((loanTypes as unknown) as string[])
  LoanType: LoanType;

  @IsString()
  @IsIn((loanPurposes as unknown) as string[])
  LoanPurpose: LoanPurpose;

  @IsNumber()
  @IsPositive()
  @Max(24)
  @Type(() => Number)
  LoanTerm: number;
}

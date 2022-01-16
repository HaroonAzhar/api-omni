import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

import { CreateStoredCashflow } from '../stored-cashflow.interface';

export class CreateStoredCashflowDto implements CreateStoredCashflow {
  @IsNumber()
  @Type(() => Number)
  Amount: number;

  @IsDate()
  @Type(() => Date)
  TransactionDate: string;

  @IsNumber()
  @Type(() => Number)
  FkFundId: number;
}

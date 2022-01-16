import { Type } from 'class-transformer';
import { IsNumber, IsString, IsOptional, Min, IsISO8601 } from 'class-validator';

import { Cashflow } from '../cashflow.interface';

export class CreateCashflowDto implements Cashflow {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  Amount: number;

  @IsString()
  @IsOptional()
  Description?: string;

  @IsISO8601({ strict: false })
  ActualDate: string;
}

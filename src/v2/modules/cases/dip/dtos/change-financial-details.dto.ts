import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsOptional, Min } from 'class-validator';

import { ChangeFinancialDetailsCommandContent } from '../dip.interface';

export class ChangeFinancialDetailsDto implements ChangeFinancialDetailsCommandContent {
  @Min(0)
  @IsNumber()
  @Type(() => Number)
  MaxLtvDayOne: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  BuildPeriodMonths?: number;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  LtvToGdv?: number;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  FurtherDrawDowns?: number;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  PurchasePrice?: number;
}

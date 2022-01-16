import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, Min } from 'class-validator';

import { CreateFurtherDrawdown } from '../further-drawdown.interface';

export class CreateFurtherDrawdownDto implements Omit<CreateFurtherDrawdown, 'CreatedBy'> {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  RequestedAmount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  CumulativeBalance: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  TotalValuations: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  TotalGDV: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  LTV: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  LTGDV: number;

  @IsDate()
  @Type(() => Date)
  RequestedDate: string;

  @IsString()
  @IsOptional()
  Notes?: string;
}

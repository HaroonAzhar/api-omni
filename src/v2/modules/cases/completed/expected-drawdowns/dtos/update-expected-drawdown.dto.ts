import { Type } from 'class-transformer';
import { IsDate, IsNumber, Min, IsOptional } from 'class-validator';

import { UpdateExpectedDrawdown } from '../expected-drawdown.interface';

export class UpdateExpectedDrawdownDto implements Omit<UpdateExpectedDrawdown, 'UpdatedBy'> {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  Amount?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  Date?: string;
}

import { Type } from 'class-transformer';
import { IsDate, IsNumber, Min } from 'class-validator';

import { CreateExpectedDrawdown } from '../expected-drawdown.interface';

export class CreateExpectedDrawdownDto implements Omit<CreateExpectedDrawdown, 'CreatedBy'> {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  Amount: number;

  @IsDate()
  @Type(() => Date)
  Date: string;
}

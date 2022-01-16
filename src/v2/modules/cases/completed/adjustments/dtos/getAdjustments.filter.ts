import { IsISO8601, IsOptional, IsString } from 'class-validator';

import { AdjustmentsFilterQuery } from '../adjustment.interface';

export class GetAdjustmentsFilter implements AdjustmentsFilterQuery {
  @IsString()
  @IsOptional()
  TransactionType?: string;

  @IsISO8601({ strict: false })
  @IsOptional()
  ActualDateMax?: string;

  @IsISO8601({ strict: false })
  @IsOptional()
  ActualDateMin?: string;
}

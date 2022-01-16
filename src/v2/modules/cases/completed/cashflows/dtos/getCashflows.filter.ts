import { IsISO8601, IsOptional } from 'class-validator';

import { CashflowsFilterQuery } from '../cashflow.interface';

export class GetCashflowsFilter implements CashflowsFilterQuery {
  @IsISO8601({ strict: false })
  @IsOptional()
  ActualDateMax?: string;

  @IsISO8601({ strict: false })
  @IsOptional()
  ActualDateMin?: string;
}

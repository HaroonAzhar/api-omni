import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, Min } from 'class-validator';

import { CreateEstimatedRedemption } from '../estimated-redemption.interface';

export class CreateEstimatedRedemptionDto implements Omit<CreateEstimatedRedemption, 'CreatedBy'> {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  Amount: number;

  @IsDate()
  @Type(() => Date)
  Date: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  FkSecurityId?: number;
}

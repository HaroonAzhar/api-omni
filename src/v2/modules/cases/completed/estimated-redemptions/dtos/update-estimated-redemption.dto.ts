import { Type } from 'class-transformer';
import { IsDate, IsNumber, Min, IsOptional } from 'class-validator';

import { UpdateEstimatedRedemption } from '../estimated-redemption.interface';

export class UpdateEstimatedRedemptionDto implements Omit<UpdateEstimatedRedemption, 'UpdatedBy'> {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  Amount?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  Date?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  FkSecurityId?: number;
}

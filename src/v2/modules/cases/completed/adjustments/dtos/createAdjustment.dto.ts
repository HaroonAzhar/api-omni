import { Type } from 'class-transformer';
import { IsISO8601, IsNumber, IsPositive, IsString, IsOptional, IsIn } from 'class-validator';

import { CreateAdjustment, BalanceEffect, balanceEffects } from '../adjustment.interface';

export class CreateAdjustmentDto implements CreateAdjustment {
  @IsISO8601({ strict: false })
  ActualDate: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  Amount: number;

  @IsString()
  @IsIn((balanceEffects as unknown) as string[])
  BalanceEffect: BalanceEffect;

  @IsString()
  TransactionType: string;

  @IsString()
  @IsOptional()
  Description?: string;

  @IsString()
  @IsOptional()
  InternalNote?: string;
}

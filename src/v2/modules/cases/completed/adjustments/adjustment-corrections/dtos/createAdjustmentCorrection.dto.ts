import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

import { AdjustmentCorrection } from '../adjustment-correction.interface';

export class CreateAdjustmentCorrectionDto implements AdjustmentCorrection {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  CorrectedAmount: number;

  @IsString()
  Description: string;
}

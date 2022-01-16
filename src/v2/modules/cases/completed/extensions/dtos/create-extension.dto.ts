import { Type } from 'class-transformer';
import { IsISO8601, IsNumber } from 'class-validator';

import { Extension } from '../extension.interface';

export class CreateExtensionDto implements Extension {
  @IsNumber()
  @Type(() => Number)
  InterestRate: number;

  @IsISO8601({ strict: false })
  Date: string;
}

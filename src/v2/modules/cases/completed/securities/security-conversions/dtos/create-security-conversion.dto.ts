import { IsOptional, IsString } from 'class-validator';

import { CreateSecurityConversion } from '../security-conversions.interface';
export class CreateSecurityConversionDto implements Omit<CreateSecurityConversion, 'CreatedBy'> {
  @IsString()
  @IsOptional()
  Notes?: string;
}

import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

import { CreateSecurityRelease, SaleType, saleTypes } from '../security-releases.interface';
export class CreateSecurityReleaseDto implements Omit<CreateSecurityRelease, 'CreatedBy'> {
  @IsString()
  @IsOptional()
  Notes?: string;

  @IsBoolean()
  @Type(() => Boolean)
  DisposalToConnectedParty: boolean;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  SalePrice: number;

  @IsString()
  @IsIn((saleTypes as unknown) as string[])
  SaleType: SaleType;
}

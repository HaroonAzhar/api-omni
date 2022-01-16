import { Type } from 'class-transformer';
import {
  IsString,
  IsIn,
  IsOptional,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
  IsPositive,
  IsNumber,
} from 'class-validator';

import { SecurityType, securityTypes } from '../../types/security-type/security-type.interface';
import { ChangeSecuritiesCommandContent, DipSecurity, OpflChargeType, opflChargeTypes } from '../dip.interface';

class SecurityDto implements DipSecurity {
  @IsString()
  SecurityAddressLine1: string;

  @IsOptional()
  @IsString()
  SecurityAddressLine2?: string;

  @IsString()
  SecurityTownCity: string;

  @IsString()
  SecurityPostcode: string;

  @IsString()
  SecurityCountry: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  SecurityInitialEstimation: number;

  @IsString()
  @IsIn((securityTypes as unknown) as string[])
  SecurityType: SecurityType;

  @IsString()
  @IsIn((opflChargeTypes as unknown) as string[])
  OpflType: OpflChargeType;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  Gdv?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  Estimated90DayGdv?: number;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  CurrentEstimated90DayMarketValue: number;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  ValueExistingMortgage: number;
}

export class ChangeSecuritiesDto implements ChangeSecuritiesCommandContent {
  @ValidateNested()
  @ArrayNotEmpty()
  @IsArray()
  @Type(() => SecurityDto)
  securities: SecurityDto[];
}

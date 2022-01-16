import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNumber, IsOptional, IsString, Min, ValidateIf } from 'class-validator';

import { CreateSecurityValuation, ValuationType, valuationTypes } from '../security-valuations.interface';
export class CreateSecurityValuationDto implements Omit<CreateSecurityValuation, 'CreatedBy'> {
  @IsString()
  Valuer: string;

  @IsDate()
  @Type(() => Date)
  ValuationDate: string;

  @IsDate()
  @Type(() => Date)
  ReportDate: string;

  @IsString()
  RecipientName: string;

  @IsString()
  @IsIn((valuationTypes as unknown) as string[])
  ValuationType: ValuationType;

  @IsString()
  @ValidateIf((object) => object.ValuationType === valuationTypes[valuationTypes.length - 1])
  ValuationTypeOther?: string;

  @IsString()
  @IsOptional()
  Notes?: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  Valuation: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  GDV: number;
}

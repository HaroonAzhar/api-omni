import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString, IsOptional, IsIn, IsBoolean, ValidateIf, Min } from 'class-validator';

import { loanTypes, LoanType } from '../../types/loan-type/loan-type.interface';
import { SecurityType, securityTypes } from '../../types/security-type/security-type.interface';
import { CreateEnquiry } from '../enquiry.interface';

export class CreateEnquiryDto implements CreateEnquiry {
  @IsString()
  EnquiryName: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  FkOriginatorId: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  FkBrokerCompanyId: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  FkBrokerIndividualId: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  MaximumLtv: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  EstimatedSecurityValue: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  LoanPeriod: number;

  @IsString()
  @IsIn((loanTypes as unknown) as string[])
  InterestType: LoanType;

  @IsBoolean()
  @Type(() => Boolean)
  CalculateMaxFromSecurity: boolean;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ValidateIf((object) => !object.CalculateMaxFromSecurity)
  NetLoanAmount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  Gdv: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  MaximumGdltv: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  BuildPeriod: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  FurtherDrawdownsAmount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  InterestRate: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  ArrangementFeeTotal: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  ArrangementFeeBroker: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  OtherFees?: number;

  @IsString()
  @IsOptional()
  Notes?: string;

  @IsString()
  @IsOptional()
  PropertyLocation: string;

  @IsOptional()
  @IsString()
  @IsIn((securityTypes as unknown) as string[])
  PropertyType?: SecurityType;
}

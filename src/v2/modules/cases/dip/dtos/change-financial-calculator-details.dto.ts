import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested, IsIn, IsBoolean, IsArray } from 'class-validator';

import {
  ChangeFinancialCalculatorDetailsCommandContent,
  DipDrawdown,
  StartingPoint,
  startingPoints,
  ValueType,
  valueTypes,
} from '../dip.interface';

class DrawdownDto implements DipDrawdown {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  Advance: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  ArrFeeOut: number;

  @IsString()
  Date: string;

  @IsNumber()
  @Type(() => Number)
  EndBal: number;

  @IsNumber()
  @Type(() => Number)
  GrossLtgdv: number;

  @IsNumber()
  @Type(() => Number)
  GrossLtv: number;

  @IsNumber()
  @Type(() => Number)
  Interest: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  InterestPaid: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  TotalFees: number;
}

export class ChangeFinancialCalculatorDetailsDto implements ChangeFinancialCalculatorDetailsCommandContent {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  EstimatedInterest?: number;

  @IsNumber()
  @Type(() => Number)
  ArrangementFee: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  ArrangementFeeRepayment: number;

  @IsNumber()
  @Type(() => Number)
  GrossAmountOfFirstAdvance: number;

  @IsNumber()
  @Type(() => Number)
  GrossAmountAtMaturity: number;

  @IsNumber()
  @Type(() => Number)
  TotalInterest: number;

  @IsNumber()
  @Type(() => Number)
  GrossAmountForLtv: number;

  @IsNumber()
  @Type(() => Number)
  GrossDayOneLtv: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  GrossTotalLoanAmount: number;

  @IsNumber()
  @Type(() => Number)
  GrossLoanFirstAdvance: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  MaxTotalNetLoanAvailable: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  InitialNetLoanAmount?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  NetAmountOfFirstAdvance: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  AdvancedInterest: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  TotalFees: number;

  @IsNumber()
  @Type(() => Number)
  TotalLoanAmount: number;

  @IsNumber()
  @Type(() => Number)
  TotalLoanFacility: number;

  @IsNumber()
  @Type(() => Number)
  Xirr: number;

  @IsString()
  RepaymentDate: string;

  @IsString()
  MaturityDate: string;

  @IsNumber()
  @Type(() => Number)
  Gdltv: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  Gdltv90Day?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  ServicedInterestTotal: number;

  @IsNumber()
  @Type(() => Number)
  ArrangementFeeRetainedValue: number;

  @IsNumber()
  @Type(() => Number)
  ExitFeeRetainedValue: number;

  @IsNumber()
  @Type(() => Number)
  TotalLoanFacilityExcludingInterest: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => DrawdownDto)
  drawdowns: DrawdownDto[];

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  MarketValue?: number;

  @IsString()
  StartDate: string;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  furtherAdvances?: number[];

  @IsString()
  @IsIn((startingPoints as unknown) as string[])
  StartingPoint: StartingPoint;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  InitialNetLoanAmountInput: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  ArrangementFeeInput?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  ArrangementFeePercent?: number;

  @IsNumber()
  @Type(() => Number)
  InterestRate: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  IntermediaryCommissionFeeValue?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  TitleInsuranceFee?: number;

  @IsNumber()
  @Type(() => Number)
  PremiumForLendersInsurance: number;

  @IsNumber()
  @Type(() => Number)
  CompletionAdministrationFee: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  ArrangementFeeRepaymentInput?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  IntermediaryCommissionFeePercent?: number;

  @IsBoolean()
  @IsOptional()
  IsManualMode?: boolean;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  ExitFeeIntermediary?: number;

  @IsString()
  @IsIn((valueTypes as unknown) as string[])
  @IsOptional()
  ValueTypeOfArrangementFee?: ValueType;

  @IsString()
  @IsIn((valueTypes as unknown) as string[])
  @IsOptional()
  ValueTypeOfIntermediaryFee?: ValueType;
}

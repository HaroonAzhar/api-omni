import { IntroducerType } from '../types/introducer-type/introducer-type.interface';
import { AdvanceType } from '../types/advance-type/advance-type.interface';
import { ContactType } from '../types/contact-type/contact-type.interface';
import { BuildingType } from '../types/building-type/building-type.interface';
import { LoanType } from '../types/loan-type/loan-type.interface';
import { SecurityType } from '../types/security-type/security-type.interface';
import { DipContact, ChangeContactIndividual } from './dip.contact.interface';

export const opflChargeTypes = ['first_charge', 'second_charge'] as const;
export type OpflChargeType = typeof opflChargeTypes[number];

export const loanPurposes = ['purchase', 'refinance', 'capital_raising'] as const;
export type LoanPurpose = typeof loanPurposes[number];

export type DipSecurity = {
  FkDipId?: number;
  SecurityId?: number;
  SecurityAddressLine1: string;
  SecurityAddressLine2?: string;
  SecurityTownCity: string;
  SecurityPostcode: string;
  SecurityCountry: string;
  SecurityInitialEstimation: number;
  SecurityType: SecurityType;
  FkOpflTypeId?: number;
  OpflType: OpflChargeType;
  Gdv?: number;
  Estimated90DayGdv?: number;
  CurrentEstimated90DayMarketValue?: number;
  ValueExistingMortgage?: number;
};

export interface DipDrawdown {
  FkLoanFinancialDetailsId?: number;
  Advance?: number;
  ArrFeeOut?: number;
  Date: string;
  EndBal: number;
  GrossLtgdv: number;
  GrossLtv: number;
  Interest: number;
  InterestPaid?: number;
  TotalFees?: number;
}

export interface DipCalculatorResponse {
  advanced_interest: number;
  arrangement_fee_in_value: number;
  exit_fee_value: number;
  gross_amount_of_first_advance: number;
  gross_amount_at_maturity: number;
  total_interest: number;
  gross_amount_for_ltv: number;
  arrangement_fee_retained_value: number;
  exit_fee_retained_value: number;
  total_loan_facility_excluding_interest: number;
  gross_day_one_ltv: number;
  gross_loan: number;
  gross_loan_first_advance: number;
  max_total_net_loan_available: number;
  net_amount_of_first_advance: number;
  total_fees: number;
  total_loan_amount: number;
  total_loan_facility: number;
  intermediary_commission_fee_value: number;
  drawdowns: DipDrawdown[];

  xirr: number;
  repayment_date: string;
  maturity_date: string;
  gdltv: number;

  serviced_interest_total?: number;
}

export type Dip = {
  DipId?: number;
  FkCaseId: number;

  FkLoanFinancialDetailsId?: number;
  FkContactId?: number;

  securities?: DipSecurity[];

  type_of_loan?: string;
  LoanType?: LoanType;
  AdvanceType?: AdvanceType;
  loan_advance_type?: string;

  build_period?: number;
  BuildPeriodMonths?: number;

  calculator_response?: DipCalculatorResponse;

  FkOriginatorId?: number;
  FkBrokerId?: number;

  arrangement_fee_repayment_date?: number;

  type_of_applicant?: ContactType;
  ContactType?: ContactType;

  introducer_type?: IntroducerType;
  IntroducerType?: IntroducerType;
  FkIntroducerId?: number;

  FkLoanAdvanceTypeId?: number;
  FkCompanyContactId?: number;
  FkBuildingTypeId?: number;
  FkTypeOfLoanId?: number;

  FkLoanFinancialDetailsMultiId?: number;
  FkLoanFinancialDetailsDevId?: number;
  FkLoanPropertyDevelopmentId?: number;
} & Partial<ChangeContactIndividual> &
  Partial<DipContact> &
  Partial<ChangeBuildingTypeCommandContent> &
  Partial<ChangeLoanDetailsCommandContent> &
  Partial<ChangeFinancialDetailsCommandContent> &
  Partial<ChangeIntroducerDetailsEntity> &
  Partial<ChangeFinancialCalculatorDetailsCommandContent>;

export type ChangeIntroducerTypeCommandContent = {
  FkOriginatorId?: number;
  IntroducerType: IntroducerType;
  FkCaseId?: number;
};

export type ChangeIntroducerDetailsEntity = ChangeIntroducerDetailsCommandContent & {
  BrokerName: string;
  BrokerCompanyName: string;
  BrokerEmail: string;
};

export type ChangeIntroducerDetailsCommandContent = {
  FkBrokerCompanyId: number;
  FkBrokerIndividualId: number;
  FkCaseId?: number;
};

export type ChangeIntroducerCommandContent = ChangeIntroducerTypeCommandContent &
  Partial<ChangeIntroducerDetailsCommandContent>;

export type ChangeAdvanceTypeCommandContent = {
  AdvanceType: AdvanceType;
  FkCaseId?: number;
};

export type ChangeBuildingTypeCommandContent = {
  BuildingType: BuildingType;
  FkCaseId?: number;
};

export type ChangeSecuritiesCommandContent = {
  securities: DipSecurity[];
  FkCaseId?: number;
};

export type ChangeLoanDetailsCommandContent = {
  LoanType: LoanType;
  LoanPurpose?: LoanPurpose;
  LoanTerm: number;
  FkCaseId?: number;
};

export type ChangeFinancialDetailsCommandContent = {
  MaxLtvDayOne?: number;
  FurtherDrawDowns?: number;
  LtvToGdv?: number;
  BuildPeriodMonths?: number;
  PurchasePrice?: number;
  FkCaseId?: number;
};

type ChangeCalculatorCommandContent = {
  EstimatedInterest: number;
  AdvancedInterest: number;
  NetAmountOfFirstAdvance: number;
  ArrangementFee: number;
  ArrangementFeeRepayment: number;
  GrossAmountOfFirstAdvance: number;
  GrossAmountAtMaturity: number;
  TotalInterest: number;
  GrossAmountForLtv: number;
  GrossDayOneLtv: number;
  GrossTotalLoanAmount: number;
  GrossLoanFirstAdvance: number;
  MaxTotalNetLoanAvailable: number;
  InitialNetLoanAmount: number;
  TotalFees: number;
  TotalLoanAmount: number;
  TotalLoanFacility: number;
  Xirr: number;
  RepaymentDate: string;
  MaturityDate: string;
  Gdltv: number;
  Gdltv90Day: number;

  ServicedInterestTotal: number;
  ArrangementFeeRetainedValue: number;
  ExitFeeRetainedValue: number;
  TotalLoanFacilityExcludingInterest: number;

  drawdowns: DipDrawdown[];
  furtherAdvances?: number[];
  steps: DipStep[];
};

export const startingPoints = ['market_value', 'initial_net_loan_amount', 'gross_amount_at_maturity'] as const;
export type StartingPoint = typeof startingPoints[number];

export const valueTypes = ['percent', 'value'] as const;
export type ValueType = typeof valueTypes[number];
export type ChangeFinancialCalculatorDetailsCommandContent = Partial<
  {
    FkCaseId?: number;
    MarketValue?: number;
    StartDate: string;
    FurtherAdvances?: string;
    StartingPoint: StartingPoint;
    InitialNetLoanAmountInput: number;
    ArrangementFeeInput?: number;
    ArrangementFeePercent?: number;
    InterestRate: number;
    IntermediaryCommissionFeeValue?: number;
    TitleInsuranceFee?: number;
    PremiumForLendersInsurance: number;
    CompletionAdministrationFee: number;
    ArrangementFeeRepaymentInput?: number;
    IntermediaryCommissionFeePercent?: number;
    IsManualMode?: boolean;
    ExitFeeIntermediary?: number;
    ValueTypeOfArrangementFee?: ValueType;
    ValueTypeOfIntermediaryFee?: ValueType;
  } & ChangeCalculatorCommandContent
>;

export const moduleName = 'dip';

export const INTRODUCER_DETAILS = 'Introducer details';
export const TYPE_OF_LOAN = 'Type of Loan';
export const TYPE_OF_APPLICANT = 'Type of Applicant';
export const APPLICANT_DETAILS = 'Applicant details';
export const SECURITY_DETAILS = 'Security details';
export const LOAN_DETAILS = 'Loan details';
export const FINANCIAL_DETAILS = 'Financial details';
export const FINANCIAL_DETAILS_SUMMARY = 'Financial details - Summary';
export const DIP_SUMMARY = 'DIP Summary';

export const dipStepNames = [
  INTRODUCER_DETAILS,
  TYPE_OF_LOAN,
  TYPE_OF_APPLICANT,
  APPLICANT_DETAILS,
  SECURITY_DETAILS,
  LOAN_DETAILS,
  FINANCIAL_DETAILS,
  FINANCIAL_DETAILS_SUMMARY,
  DIP_SUMMARY,
] as const;
export type DipStepName = typeof dipStepNames[number];

export type ChangeDipStepStatus = {
  Name: DipStepName;
  EditedDate?: Date;
};

export type DipStep = Required<ChangeDipStepStatus>;

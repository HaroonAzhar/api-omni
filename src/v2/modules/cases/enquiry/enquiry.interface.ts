import { LoanType } from '../types/loan-type/loan-type.interface';
import { SecurityType } from '../types/security-type/security-type.interface';

export type CreateEnquiry = {
  EnquiryName: string;
  FkBrokerCompanyId: number;
  FkBrokerIndividualId: number;
  FkOriginatorId: number;

  EstimatedSecurityValue: number;
  MaximumLtv: number;
  LoanPeriod: number;
  InterestType: LoanType;

  CalculateMaxFromSecurity: boolean;
  NetLoanAmount?: number;
  Gdv?: number;
  MaximumGdltv?: number;
  BuildPeriod?: number;
  FurtherDrawdownsAmount?: number;

  InterestRate: number;
  ArrangementFeeTotal: number;
  ArrangementFeeBroker: number;
  OtherFees?: number;

  PropertyLocation?: string;
  PropertyType?: SecurityType;
  Notes?: string;
};

export type UpdateEnquiry = Partial<CreateEnquiry>;

export type CreateEnquiryEntity = {
  FkCaseId: number;
} & CreateEnquiry;

export type EnquiryEntity = {
  EnquiryId: number;
} & CreateEnquiryEntity;

export type UpdateEnquiryEntity = Partial<EnquiryEntity>;

export type Enquiry = {
  CaseNr: string;
  Status: string;
} & EnquiryEntity;

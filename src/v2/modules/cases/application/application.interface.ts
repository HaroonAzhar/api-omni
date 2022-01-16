import { Dip } from '../dip/dip.interface';

export type PropertyValuationReport = {
  Gdv: number;
  MarketValue: number;
  ReportDate: string;
  InspectionDate: string;
  Surveyor: string;
  NameOfTheIndividualSurveyor: string;
  PropertyValuationReportId: number;
};

export type CreatePropertyEntity = {
  AddressLine1: string;
  AddressLine2?: string;
  AddressPostcode: string;
  AddressCity: string;
  AddressCountry: string;
  CasePropertyId?: number;
};

export type PropertyEntity = CreatePropertyEntity & {
  CasePropertyId: number;
  Lenders: string;
  TitleNumbers: string;
  FkStatusId: number;
};

export type Property = PropertyEntity & {
  titleNumbers: string[];
  lenders: string[];
  valuationReport?: PropertyValuationReport;
  status: string;
};
export type Individual = {
  FkSharedContactId: number;
  amlKyc: {
    ProofOfId: string;
    ProofOfIdExpiryDate: string;
  };
};
type Company = unknown;

export interface AmlKycValidation {
  ValidationUserName: string;
  ValidationUserDate: string;
  ValidationMlroName: string;
  ValidationMlroDate: string;
}

type IntroducerDetails = unknown;
type SolicitorDetails = unknown;

export interface Application {
  FkCaseId?: number;
  properties?: Property[];
  individuals?: Individual[];
  companies?: Company[];
  loanDetails?: Dip;
  amlKycValidation?: AmlKycValidation;
  steps: StepName[];
  introducerDetails?: IntroducerDetails;
  solicitorDetails?: SolicitorDetails;
}

export const IntroducerDetailStepName = 'introducer_details';
export const LoanDetailsStepName = 'loan_details';
export const CompanyDetailsStepName = 'company_details';
export const ApplicantDetailsStepName = 'applicant_details';
export const CreditHistoryStepName = 'credit_history';
export const DeclarationsStepName = 'declarations';
export const AssetsAndLiabilitiesStepName = 'assets_and_liabilities';
export const SecurityDetailsStepName = 'security_details';
export const ValuationReportStepName = 'valuation_report';
export const AdditionalInformationStepName = 'additional_information';
export const SolicitorDetailsStepName = 'solicitor_details';
export const AmlKycStepName = 'aml_kyc';

export const stepNames = [
  IntroducerDetailStepName,
  CompanyDetailsStepName,
  ApplicantDetailsStepName,
  CreditHistoryStepName,
  LoanDetailsStepName,
  SecurityDetailsStepName,
  SolicitorDetailsStepName,
  AdditionalInformationStepName,
  DeclarationsStepName,
  AssetsAndLiabilitiesStepName,
  ValuationReportStepName,
  AmlKycStepName,
] as const;

export type StepName = typeof stepNames[number];

export const RecheckStatus = 'Recheck';
export const EditedStatus = 'Edited';

export const statuses = [RecheckStatus, EditedStatus] as const;

export type Status = typeof statuses[number];

export abstract class ApplicationRepositoryInterface {
  abstract getByCaseId(FkCaseId: number): Promise<Application>;
  abstract changeStepStatus(FKCaseId: number, stepName: StepName, status: Status): Promise<void>;
  abstract changePropertiesStatus(FkCaseId: number, stepName: StepName, status: Status): Promise<void>;
  abstract changeIndividualsStatus(FkCaseId: number, status: Status): Promise<void>;
  abstract invalidateAmlKycValidation(FkCaseId: number): Promise<void>;
  abstract addProperty(property: CreatePropertyEntity): Promise<number>;
  abstract getProperty(CasePropertyId: number): Promise<Property>;
}

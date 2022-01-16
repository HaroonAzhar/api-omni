export const valuationTypes = ['Full Valuation', 'QS Report', 'Other - Specify'] as const;
export type ValuationType = typeof valuationTypes[number];

export type SecurityValuationEntity = {
  SecurityValuationId: number;
  FkSecurityId: number;

  CreatedBy: string;
  CreatedDate: string;

  Valuer: string;
  ValuationDate: string;
  ReportDate: string;
  RecipientName: string;
  ValuationType: ValuationType;

  ValuationTypeOther?: string;
  Notes?: string;

  Valuation: number;
  GDV: number;

  FkPropertyValuationReportId?: number;
};

export type CreateSecurityValuationEntity = Omit<SecurityValuationEntity, 'SecurityValuationId' | 'CreatedDate'>;

export type SecurityValuation = SecurityValuationEntity;

export type CreateSecurityValuation = Omit<CreateSecurityValuationEntity, 'FkSecurityId'>;

export const moduleName = 'security-valuations';

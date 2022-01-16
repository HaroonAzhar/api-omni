export type SecurityConversionEntity = {
  SecurityConversionId: number;
  FkSecurityId: number;

  CreatedBy: string;
  CreatedDate: string;

  Notes?: string;
};

export type CreateSecurityConversionEntity = Omit<SecurityConversionEntity, 'SecurityConversionId' | 'CreatedDate'>;

export type SecurityConversion = SecurityConversionEntity;

export type CreateSecurityConversion = Omit<CreateSecurityConversionEntity, 'FkSecurityId'>;

export const moduleName = 'security-conversions';

export const saleTypes = ['Auction', 'Conventional Sale'] as const;
export type SaleType = typeof saleTypes[number];

export type SecurityReleaseEntity = {
  SecurityReleaseId: number;
  FkSecurityId: number;

  CreatedBy: string;
  CreatedDate: string;

  Notes?: string;
  SalePrice: number;
  SaleType: SaleType;
  DisposalToConnectedParty: boolean;
};

export type CreateSecurityReleaseEntity = Omit<SecurityReleaseEntity, 'SecurityReleaseId' | 'CreatedDate'>;

export type SecurityRelease = SecurityReleaseEntity;

export type CreateSecurityRelease = Omit<CreateSecurityReleaseEntity, 'FkSecurityId'>;

export const moduleName = 'security-releases';

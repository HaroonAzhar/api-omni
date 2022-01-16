import { Security } from '../securities/security.interface';

export type EstimatedRedemption = {
  EstimatedRedemptionId: number;
  FkCompletedId: number;

  Date: string;
  Amount?: number;

  CreatedDate: string;
  CreatedBy: string;

  security?: Security;
  FkSecurityId?: number;
};

export type CreateEstimatedRedemption = Omit<
  EstimatedRedemption,
  'FkCompletedId' | 'EstimatedRedemptionId' | 'CreatedDate'
>;

export type UpdateEstimatedRedemption = Partial<EstimatedRedemption>;

export type DeleteEstimatedRedemption = {
  EstimatedRedemptionId: number;
};

export const moduleName = 'estimated-redemptions';

export type EstimatedRedemptionEntity = EstimatedRedemption;

export type CreateEstimatedRedemptionEntity = Omit<EstimatedRedemptionEntity, 'EstimatedRedemptionId' | 'CreatedDate'>;

export type UpdateEstimatedRedemptionEntity = Partial<Omit<EstimatedRedemptionEntity, 'EstimatedRedemptionId'>> & {
  EstimatedRedemptionId: number;
};

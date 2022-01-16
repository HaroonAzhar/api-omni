import {
  OriginationChecklistSectionFields,
  CreateOriginationChecklistSectionEntity,
  OriginationChecklistSectionComputedFields,
} from '../section-shared/origination-checklist-section.interface';

type CreditSafeFields = {
  OriginationChecklistCreditSafeId: number;

  NameMatchesOfferLetter?: boolean;
  EnsureNoCCJ?: boolean;
  DirectorsListedTheSame?: boolean;
};

export type OriginationChecklistCreditSafeEntity = CreditSafeFields & OriginationChecklistSectionFields;

export type CreateOriginationChecklistCreditSafeEntity = CreateOriginationChecklistSectionEntity;

export type UpdateOriginationChecklistCreditSafeEntity = Omit<
  OriginationChecklistCreditSafeEntity,
  'FkOriginationChecklistId' | 'OriginationChecklistCreditSafeId'
>;

export type OriginationChecklistCreditSafe = OriginationChecklistSectionComputedFields & CreditSafeFields;

export const moduleName = 'further-drawdowns-origination-checklist-origination-checklist-credit-safe';

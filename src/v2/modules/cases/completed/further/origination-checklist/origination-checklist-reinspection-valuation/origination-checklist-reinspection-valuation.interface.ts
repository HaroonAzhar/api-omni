import {
  OriginationChecklistSectionFields,
  CreateOriginationChecklistSectionEntity,
  OriginationChecklistSectionComputedFields,
} from '../section-shared/origination-checklist-section.interface';

type ReinspectionValuationFields = {
  OriginationChecklistReinspectionValuationId: number;

  ValuerOnApproved?: boolean;
  SignedAndDated?: boolean;
  AddressedToCorrect?: boolean;
  Within3Months?: boolean;
  AddressMatches?: boolean;
};
export type OriginationChecklistReinspectionValuationEntity = ReinspectionValuationFields &
  OriginationChecklistSectionFields;

export type CreateOriginationChecklistReinspectionValuationEntity = CreateOriginationChecklistSectionEntity;

export type UpdateOriginationChecklistReinspectionValuationEntity = Omit<
  OriginationChecklistReinspectionValuationEntity,
  'FkOriginationChecklistId' | 'OriginationChecklistReinspectionValuationId'
>;

export type OriginationChecklistReinspectionValuation = OriginationChecklistSectionComputedFields &
  ReinspectionValuationFields;

export const moduleName = 'further-drawdowns-origination-checklist-origination-checklist-reinspection-valuation';

import {
  OriginationChecklistSectionFields,
  CreateOriginationChecklistSectionEntity,
  OriginationChecklistSectionComputedFields,
} from '../section-shared/origination-checklist-section.interface';

type InsuranceFields = {
  OriginationChecklistInsuranceId: number;
};

export type OriginationChecklistInsuranceEntity = InsuranceFields & OriginationChecklistSectionFields;

export type CreateOriginationChecklistInsuranceEntity = CreateOriginationChecklistSectionEntity;

export type UpdateOriginationChecklistInsuranceEntity = Omit<
  OriginationChecklistInsuranceEntity,
  'FkOriginationChecklistId' | 'OriginationChecklistInsuranceId'
>;

export type OriginationChecklistInsurance = OriginationChecklistSectionComputedFields & InsuranceFields;

export const moduleName = 'further-drawdowns-origination-checklist-origination-checklist-Insurance';

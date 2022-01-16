import {
  OriginationChecklistSectionFields,
  CreateOriginationChecklistSectionEntity,
  OriginationChecklistSectionComputedFields,
} from '../section-shared/origination-checklist-section.interface';

type AmlFields = {
  OriginationChecklistAmlId: number;
};

export type OriginationChecklistAmlEntity = OriginationChecklistSectionFields & AmlFields;

export type CreateOriginationChecklistAmlEntity = CreateOriginationChecklistSectionEntity;

export type UpdateOriginationChecklistAmlEntity = Omit<
  OriginationChecklistAmlEntity,
  'FkOriginationChecklistId' | 'OriginationChecklistAmlId'
>;

export type OriginationChecklistAml = OriginationChecklistSectionComputedFields & AmlFields;

export const moduleName = 'further-drawdowns-origination-checklist-origination-checklist-aml';

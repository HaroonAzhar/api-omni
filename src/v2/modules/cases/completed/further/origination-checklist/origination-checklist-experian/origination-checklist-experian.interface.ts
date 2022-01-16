import {
  OriginationChecklistSectionFields,
  CreateOriginationChecklistSectionEntity,
  OriginationChecklistSectionComputedFields,
} from '../section-shared/origination-checklist-section.interface';

type ExperianFields = {
  OriginationChecklistExperianId: number;
};

export type OriginationChecklistExperianEntity = ExperianFields & OriginationChecklistSectionFields;

export type CreateOriginationChecklistExperianEntity = CreateOriginationChecklistSectionEntity;

export type UpdateOriginationChecklistExperianEntity = Omit<
  OriginationChecklistExperianEntity,
  'FkOriginationChecklistId' | 'OriginationChecklistExperianId'
>;

export type OriginationChecklistExperian = OriginationChecklistSectionComputedFields & ExperianFields;

export const moduleName = 'further-drawdowns-origination-checklist-origination-checklist-experian';

import {
  OriginationChecklistSectionFields,
  CreateOriginationChecklistSectionEntity,
  OriginationChecklistSectionComputedFields,
} from '../section-shared/origination-checklist-section.interface';

type SolicitorFields = {
  OriginationChecklistSolicitorId: number;

  Comments?: string;
};

export type OriginationChecklistSolicitorEntity = SolicitorFields & OriginationChecklistSectionFields;

export type CreateOriginationChecklistSolicitorEntity = CreateOriginationChecklistSectionEntity;

export type UpdateOriginationChecklistSolicitorEntity = Omit<
  OriginationChecklistSolicitorEntity,
  'FkOriginationChecklistId' | 'OriginationChecklistSolicitorId'
>;

export type OriginationChecklistSolicitor = OriginationChecklistSectionComputedFields & SolicitorFields;

export const moduleName = 'further-drawdowns-origination-checklist-origination-checklist-solicitor';

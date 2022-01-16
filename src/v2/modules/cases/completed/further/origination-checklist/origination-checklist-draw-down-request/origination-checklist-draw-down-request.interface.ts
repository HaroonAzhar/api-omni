import {
  OriginationChecklistSectionFields,
  CreateOriginationChecklistSectionEntity,
  OriginationChecklistSectionComputedFields,
} from '../section-shared/origination-checklist-section.interface';

type DrawDownFields = {
  OriginationChecklistDrawDownRequestId: number;

  Signatories?: string;
  AmountEnteredMatchesAmount?: boolean;
};

export type OriginationChecklistDrawDownRequestEntity = OriginationChecklistSectionFields & DrawDownFields;

export type CreateOriginationChecklistDrawDownRequestEntity = CreateOriginationChecklistSectionEntity;

export type UpdateOriginationChecklistDrawDownRequestEntity = Omit<
  OriginationChecklistDrawDownRequestEntity,
  'FkOriginationChecklistId' | 'OriginationChecklistDrawDownRequestId'
>;

export type OriginationChecklistDrawDownRequest = OriginationChecklistSectionComputedFields & DrawDownFields;

export const moduleName = 'further-drawdowns-origination-checklist-origination-checklist-draw-down-request';

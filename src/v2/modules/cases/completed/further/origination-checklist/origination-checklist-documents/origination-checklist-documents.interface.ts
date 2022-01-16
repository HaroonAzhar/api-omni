import {
  OriginationChecklistSectionFields,
  CreateOriginationChecklistSectionEntity,
  OriginationChecklistSectionComputedFields,
} from '../section-shared/origination-checklist-section.interface';

type DocumentsFields = {
  OriginationChecklistDocumentsId: number;
};

export type OriginationChecklistDocumentsEntity = OriginationChecklistSectionFields & DocumentsFields;

export type CreateOriginationChecklistDocumentsEntity = CreateOriginationChecklistSectionEntity;
export type UpdateOriginationChecklistDocumentsEntity = Omit<
  OriginationChecklistDocumentsEntity,
  'FkOriginationChecklistId' | 'OriginationChecklistDocumentsId'
>;

export type OriginationChecklistDocuments = DocumentsFields & OriginationChecklistSectionComputedFields;

export const moduleName = 'further-drawdowns-origination-checklist-origination-checklist-documents';

import {
  OriginationChecklistSectionFields,
  CreateOriginationChecklistSectionEntity,
  OriginationChecklistSectionComputedFields,
} from '../section-shared/origination-checklist-section.interface';

export type LandRegistryFields = {
  OriginationChecklistLandRegistryId: number;
};

export type OriginationChecklistLandRegistryEntity = LandRegistryFields & OriginationChecklistSectionFields;

export type CreateOriginationChecklistLandRegistryEntity = CreateOriginationChecklistSectionEntity;

export type UpdateOriginationChecklistLandRegistryEntity = Omit<
  OriginationChecklistLandRegistryEntity,
  'FkOriginationChecklistId' | 'OriginationChecklistLandRegistryId'
>;

export type OriginationChecklistLandRegistryResultEntity = {
  FkOriginationChecklistLandRegistryId: number;
  FkSecurityId: number;

  LandRegistrySearchRun: boolean;
  OmniNoted: boolean;
  NoOtherCharges: boolean;
};

export type OriginationChecklistLandRegistryResult = OriginationChecklistLandRegistryResultEntity;

export type CreateOriginationChecklistLandRegistryResultEntity = Omit<
  OriginationChecklistLandRegistryResultEntity,
  'FkOriginationChecklistLandRegistryId'
>;

export type OriginationChecklistLandRegistry = LandRegistryFields &
  OriginationChecklistSectionComputedFields & {
    results: OriginationChecklistLandRegistryResultEntity[];
  };

export const moduleName = 'further-drawdowns-origination-checklist-origination-checklist-land-registry';

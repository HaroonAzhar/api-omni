import {
  OriginationChecklistSectionFields,
  CreateOriginationChecklistSectionEntity,
  OriginationChecklistSectionComputedFields,
} from '../section-shared/origination-checklist-section.interface';

type LandChargesFields = {
  OriginationChecklistLandChargesId: number;
  CheckFacilityLetter?: boolean;
};

export type OriginationChecklistLandChargesEntity = LandChargesFields & OriginationChecklistSectionFields;

export type CreateOriginationChecklistLandChargesEntity = CreateOriginationChecklistSectionEntity;

export type UpdateOriginationChecklistLandChargesEntity = Omit<
  OriginationChecklistLandChargesEntity,
  'FkOriginationChecklistId' | 'OriginationChecklistLandChargesId'
>;

export const results = ['Clear', 'Prior to Completion', 'Fail'] as const;
export type Result = typeof results[number];
export type OriginationChecklistLandChargesResultEntity = {
  FkOriginationChecklistLandChargesId: number;
  OriginationChecklistLandChargesResultsId: number;

  Forename: string;
  MiddleName?: string;
  Surname: string;

  Result: Result;
};

export type UpdateOriginationChecklistLandChargesResultEntity = Omit<
  OriginationChecklistLandChargesResultEntity,
  'FkOriginationChecklistLandChargesId'
>;

export type CreateOriginationChecklistLandChargesResultEntity = Omit<
  UpdateOriginationChecklistLandChargesResultEntity,
  'OriginationChecklistLandChargesResultsId'
>;

export type OriginationChecklistLandCharges = {
  results: OriginationChecklistLandChargesResultEntity[];
} & LandChargesFields &
  OriginationChecklistSectionComputedFields;

export const moduleName = 'further-drawdowns-origination-checklist-origination-checklist-land-charges';

import { OriginationChecklistAml } from './origination-checklist-aml/origination-checklist-aml.interface';
import { OriginationChecklistCreditSafe } from './origination-checklist-credit-safe/origination-checklist-credit-safe.interface';
import { OriginationChecklistDocuments } from './origination-checklist-documents/origination-checklist-documents.interface';
import { OriginationChecklistDrawDownRequest } from './origination-checklist-draw-down-request/origination-checklist-draw-down-request.interface';
import { OriginationChecklistExperian } from './origination-checklist-experian/origination-checklist-experian.interface';
import { OriginationChecklistInsurance } from './origination-checklist-insurance/origination-checklist-insurance.interface';
import { OriginationChecklistLandCharges } from './origination-checklist-land-charges/origination-checklist-land-charges.interface';
import { OriginationChecklistLandRegistry } from './origination-checklist-land-registry/origination-checklist-land-registry.interface';
import { OriginationChecklistReinspectionValuation } from './origination-checklist-reinspection-valuation/origination-checklist-reinspection-valuation.interface';
import { OriginationChecklistSolicitor } from './origination-checklist-solicitor/origination-checklist-solicitor.interface';
import { Signature } from '../signature/signature.interface';

export type OriginationChecklistEntity = {
  OriginationChecklistId: number;
  FkFurtherId: number;
  FurtherType: string;

  InitialCheckUser?: string;
  InitialCheckDate?: Date;

  FinalSignOfUser?: string;
  FinalSignOfDate?: Date;

  CloseUser?: string;
  CloseDate?: Date;
  CloseComment?: string;

  SubmitToUnderwriterUser?: string;
  SubmitToUnderwriterDate?: Date;
};

export type CreateOriginationChecklistEntity = Omit<OriginationChecklistEntity, 'OriginationChecklistId'>;

const actions = ['initialCheck', 'finalSignOf', 'close', 'submitToUnderwriter'] as const;
export type Actions = typeof actions[number];

export type OriginationChecklistSections = {
  solicitor: OriginationChecklistSolicitor;
  drawDownRequest: OriginationChecklistDrawDownRequest;
  creditSafe: OriginationChecklistCreditSafe;
  landCharges: OriginationChecklistLandCharges;
  landRegistry: OriginationChecklistLandRegistry;
  insurance: OriginationChecklistInsurance;
  documents: OriginationChecklistDocuments;
  experian: OriginationChecklistExperian;
  aml: OriginationChecklistAml;
  reinspectionValuation: OriginationChecklistReinspectionValuation;
};

export type OriginationChecklist = {
  initialCheck: Signature;
  finalSignOf: Signature;
  close: Signature & { Comment: string };
  submitToUnderwriter: Signature;
  availableActions: Array<Actions>;
} & OriginationChecklistSections;

export const moduleName = 'origination-checklist';

export abstract class OriginationChecklistRepositoryInterface {
  abstract create(solicitor: CreateOriginationChecklistEntity): Promise<number>;
  abstract get(FkFurtherId: number, FurtherType: string): Promise<OriginationChecklistEntity>;
  abstract update(
    OriginationChecklistId: number,
    originationChecklist: Partial<OriginationChecklistEntity>
  ): Promise<void>;
}

export type OriginationChecklistEvent<Content> = {
  FkOriginationChecklistId: number;
  content: Content;
};

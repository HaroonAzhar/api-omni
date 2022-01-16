import { Property, CreatePropertyEntity } from '../../application/application.interface';
import { SecurityConversion } from './security-conversions/security-conversions.interface';
import { CreateSecurityNote, SecurityNote } from './security-notes/security-notes.interface';
import { SecurityRelease } from './security-releases/security-releases.interface';
import { CreateSecurityValuation, SecurityValuation } from './security-valuations/security-valuations.interface';

export type SecurityEntity = {
  SecurityId: number;
  FkCompletedId: number;
  FkCasePropertyId: number;
};

export type CreateSecurityEntity = Omit<SecurityEntity, 'SecurityId'>;

export type Security = SecurityEntity & {
  property: Property;
  notes: SecurityNote[];
  releases: SecurityRelease[];
  isReleased: boolean;
  conversions: SecurityConversion[];
  isConverted: boolean;
  valuations: SecurityValuation[];
  currentGDV?: number;
  currentValuation?: number;
};

export type CreateNewSecurity = {
  note: CreateSecurityNote;
  valuation: CreateSecurityValuation;
  property: CreatePropertyEntity;
};

export const moduleName = 'servicing-securities';

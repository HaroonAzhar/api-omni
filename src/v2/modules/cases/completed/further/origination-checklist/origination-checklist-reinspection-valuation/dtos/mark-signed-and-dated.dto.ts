import { Type } from 'class-transformer';
import { Equals, IsBoolean } from 'class-validator';

import { UpdateOriginationChecklistReinspectionValuationEntity } from '../origination-checklist-reinspection-valuation.interface';

export class MarkSignedAndDatedDto implements UpdateOriginationChecklistReinspectionValuationEntity {
  @IsBoolean()
  @Type(() => Boolean)
  @Equals(true)
  SignedAndDated: boolean;
}

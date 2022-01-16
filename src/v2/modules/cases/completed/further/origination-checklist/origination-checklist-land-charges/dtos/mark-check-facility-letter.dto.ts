import { Type } from 'class-transformer';
import { Equals, IsBoolean } from 'class-validator';

import { UpdateOriginationChecklistLandChargesEntity } from '../origination-checklist-land-charges.interface';

export class MarkCheckFacilityLetterDto implements UpdateOriginationChecklistLandChargesEntity {
  @IsBoolean()
  @Type(() => Boolean)
  @Equals(true)
  CheckFacilityLetter: boolean;
}

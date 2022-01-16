import { Type } from 'class-transformer';
import { Equals, IsBoolean } from 'class-validator';

import { UpdateOriginationChecklistReinspectionValuationEntity } from '../origination-checklist-reinspection-valuation.interface';

export class MarkAddressedToCorrectDto implements UpdateOriginationChecklistReinspectionValuationEntity {
  @IsBoolean()
  @Type(() => Boolean)
  @Equals(true)
  AddressedToCorrect: boolean;
}

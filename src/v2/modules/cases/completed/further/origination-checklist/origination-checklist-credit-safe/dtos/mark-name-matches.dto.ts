import { Type } from 'class-transformer';
import { Equals, IsBoolean } from 'class-validator';

import { UpdateOriginationChecklistCreditSafeEntity } from '../origination-checklist-credit-safe.interface';

export class MarkNameMatchesDto implements UpdateOriginationChecklistCreditSafeEntity {
  @IsBoolean()
  @Type(() => Boolean)
  @Equals(true)
  NameMatchesOfferLetter: boolean;
}

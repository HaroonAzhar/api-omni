import { Type } from 'class-transformer';
import { Equals, IsBoolean } from 'class-validator';

import { UpdateOriginationChecklistCreditSafeEntity } from '../origination-checklist-credit-safe.interface';

export class MarkNoCCJDto implements UpdateOriginationChecklistCreditSafeEntity {
  @IsBoolean()
  @Type(() => Boolean)
  @Equals(true)
  EnsureNoCCJ: boolean;
}

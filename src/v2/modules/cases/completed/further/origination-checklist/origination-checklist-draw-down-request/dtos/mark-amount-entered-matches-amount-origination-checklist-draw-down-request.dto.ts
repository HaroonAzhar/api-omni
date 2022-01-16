import { Type } from 'class-transformer';
import { Equals, IsBoolean } from 'class-validator';

import { UpdateOriginationChecklistDrawDownRequestEntity } from '../origination-checklist-draw-down-request.interface';

export class MarkAmountsEnteredMatchesAmountOriginationChecklistDrawDownRequestDto
  implements UpdateOriginationChecklistDrawDownRequestEntity {
  @IsBoolean()
  @Type(() => Boolean)
  @Equals(true)
  AmountEnteredMatchesAmount: boolean;
}

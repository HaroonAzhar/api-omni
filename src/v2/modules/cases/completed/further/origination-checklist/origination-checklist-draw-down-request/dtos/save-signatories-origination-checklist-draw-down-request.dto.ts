import { IsString } from 'class-validator';

import { UpdateOriginationChecklistDrawDownRequestEntity } from '../origination-checklist-draw-down-request.interface';

export class SaveSignatoriesOriginationChecklistDrawDownRequestDto
  implements UpdateOriginationChecklistDrawDownRequestEntity {
  @IsString()
  Signatories: string;
}

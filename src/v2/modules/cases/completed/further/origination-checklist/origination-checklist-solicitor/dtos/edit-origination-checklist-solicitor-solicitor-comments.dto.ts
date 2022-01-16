import { IsString } from 'class-validator';

import { UpdateOriginationChecklistSolicitorEntity } from '../origination-checklist-solicitor.interface';

export class EditOriginationChecklistSolicitorDto implements UpdateOriginationChecklistSolicitorEntity {
  @IsString()
  Comments: string;
}

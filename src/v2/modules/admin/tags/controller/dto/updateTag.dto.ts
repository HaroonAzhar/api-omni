import { UpdateBaseAdminDto } from '@v2/modules/admin/baseGeneric/dtos/updateBaseAdmin.dto';
import { IsString, IsOptional } from 'class-validator';

import { Tag } from '../../tag.interface';

export class UpdateTagDto extends UpdateBaseAdminDto<Tag> implements Tag {
  @IsString()
  @IsOptional()
  readonly ColorCode: string;
}

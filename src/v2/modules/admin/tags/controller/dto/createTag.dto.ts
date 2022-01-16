import { CreateBaseAdminDto } from '@v2/modules/admin/baseGeneric/dtos/createBaseAdmin.dto';
import { IsString } from 'class-validator';

import { Tag } from '../../tag.interface';

export class CreateTagDto extends CreateBaseAdminDto<Tag> implements Tag {
  @IsString()
  readonly ColorCode: string;
}

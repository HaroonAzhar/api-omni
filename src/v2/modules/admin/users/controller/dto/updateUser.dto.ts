import { UpdateBaseAdminDto } from '@v2/modules/admin/baseGeneric/dtos/updateBaseAdmin.dto';
import { IsString } from 'class-validator';

import { User } from '../../user.interface';

export class UpdateUserDto extends UpdateBaseAdminDto<User> implements User {
  @IsString()
  readonly UserIdentity: string;
}

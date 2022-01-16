import { CreateBaseAdminDto } from '@v2/modules/admin/baseGeneric/dtos/createBaseAdmin.dto';
import { IsString } from 'class-validator';

import { User } from '../../user.interface';

export class CreateUserDto extends CreateBaseAdminDto<User> implements User {
  @IsString()
  readonly UserIdentity: string;
}

import { IsString } from 'class-validator';

import { BaseAdminInterface } from '../baseAdmin.interface';

export class CreateBaseAdminDto<Base extends BaseAdminInterface> {
  @IsString()
  readonly Name: string;
}

import { IsString, IsOptional } from 'class-validator';

import { BaseAdminInterface } from '../baseAdmin.interface';

export class UpdateBaseAdminDto<Base extends BaseAdminInterface> {
  @IsString()
  @IsOptional()
  readonly Name: string;
}

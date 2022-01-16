import { UpdateBaseAdminDto } from '@v2/modules/admin/baseGeneric/dtos/updateBaseAdmin.dto';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional } from 'class-validator';

import { Solicitor } from '../../solicitor.interface';
import { AddressDto } from './address.dto';

export class UpdateSolicitorDto extends UpdateBaseAdminDto<Solicitor> implements Solicitor {
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  readonly Address?: AddressDto;
}

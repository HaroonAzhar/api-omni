import { CreateBaseAdminDto } from '@v2/modules/admin/baseGeneric/dtos/createBaseAdmin.dto';
import { ValidateNested, IsNotEmptyObject } from 'class-validator';
import { Type } from 'class-transformer';

import { Solicitor } from '../../solicitor.interface';
import { AddressDto } from './address.dto';

export class CreateSolicitorDto extends CreateBaseAdminDto<Solicitor> implements Solicitor {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  readonly Address: AddressDto;
}

import { UpdateBaseAdminDto } from '@v2/modules/admin/baseGeneric/dtos/updateBaseAdmin.dto';

import { Originator } from '../../originator.interface';

export class UpdateOriginatorDto extends UpdateBaseAdminDto<Originator> implements Originator {}

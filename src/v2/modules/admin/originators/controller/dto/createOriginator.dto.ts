import { CreateBaseAdminDto } from '@v2/modules/admin/baseGeneric/dtos/createBaseAdmin.dto';

import { Originator } from '../../originator.interface';

export class CreateOriginatorDto extends CreateBaseAdminDto<Originator> implements Originator {}

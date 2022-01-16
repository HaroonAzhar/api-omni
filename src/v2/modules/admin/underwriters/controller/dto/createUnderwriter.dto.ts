import { CreateBaseAdminDto } from '@v2/modules/admin/baseGeneric/dtos/createBaseAdmin.dto';

import { Underwriter } from '../../underwriter.interface';

export class CreateUnderwriterDto extends CreateBaseAdminDto<Underwriter> implements Underwriter {}

import { UpdateBaseAdminDto } from '@v2/modules/admin/baseGeneric/dtos/updateBaseAdmin.dto';

import { Underwriter } from '../../underwriter.interface';

export class UpdateUnderwriterDto extends UpdateBaseAdminDto<Underwriter> implements Underwriter {}

import { CreateBaseAdminDto } from '@v2/modules/admin/baseGeneric/dtos/createBaseAdmin.dto';

import { WaypointName } from '../../waypoint-name.interface';

export class CreateWaypointNameDto extends CreateBaseAdminDto<WaypointName> implements WaypointName {}

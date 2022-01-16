import { UpdateBaseAdminDto } from '@v2/modules/admin/baseGeneric/dtos/updateBaseAdmin.dto';

import { WaypointName } from '../../waypoint-name.interface';

export class UpdateWaypointNameDto extends UpdateBaseAdminDto<WaypointName> implements WaypointName {}

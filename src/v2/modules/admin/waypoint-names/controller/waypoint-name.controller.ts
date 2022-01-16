import { Controller } from '@nestjs/common';

import { BaseAdminController } from '../../baseGeneric/baseAdmin.controller';
import { WaypointName } from '../waypoint-name.interface';
import { WaypointNamesService } from '../waypoint-name.service';
import { CreateWaypointNameDto } from './dto/create-waypoint-name.dto';
import { UpdateWaypointNameDto } from './dto/update-waypoint-name.dto';

@Controller('waypointNames')
export class WaypointNamesController extends BaseAdminController<
  WaypointName,
  CreateWaypointNameDto,
  UpdateWaypointNameDto
> {
  constructor(private readonly waypointNamesService: WaypointNamesService) {
    super(waypointNamesService);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { WaypointsService } from './waypoints.service';
import { CreateWaypointDto } from './dtos/createWaypoint.dto';
import { GetWaypointsFilter } from './dtos/getWaypoints.filter';
import { UpdateWaypointDto } from './dtos/updateWaypoint.dto';

@Controller('cases/:caseUuid/completed/waypoints')
export class WaypointsController {
  constructor(private readonly waypointsService: WaypointsService) {}

  @Post()
  addWaypoint(@Param('caseUuid') caseUuid: string, @Body() params: CreateWaypointDto) {
    const { RecurringEvent, NumberOfTimesToRepeat, ...waypoint } = params;
    return this.waypointsService.createWaypoint(caseUuid, waypoint, RecurringEvent, NumberOfTimesToRepeat);
  }

  @Get()
  getWaypoints(@Param('caseUuid') caseUuid: string, @Query() query: GetWaypointsFilter) {
    return this.waypointsService.getWaypoints(caseUuid, query);
  }

  @Delete('/:waypointId')
  deleteWaypoint(@Param('caseUuid') caseUuid: string, @Param('waypointId') waypointId: number) {
    return this.waypointsService.deleteWaypoint(caseUuid, waypointId);
  }

  @Patch('/:waypointId')
  updateWaypoint(
    @Param('caseUuid') caseUuid: string,
    @Param('waypointId') waypointId: number,
    @Body() params: UpdateWaypointDto
  ) {
    return this.waypointsService.updateWaypoint(caseUuid, waypointId, params);
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { createResponseProperties, Pagination, PaginationQuery, PaginationQueryParams } from '@v2/utils/pagination';

import { WaypointsFilterQuery } from '../cases/completed/waypoints/waypoint.interface';
import { AllWaypointsService } from './all-waypoints.service';

@Controller('waypoints')
export class AllWaypointsController {
  constructor(private readonly allWaypointsService: AllWaypointsService) {}
  @Get()
  async findAll(
    @PaginationQuery() paginationQueryParams: PaginationQueryParams,
    @Query() filterParams: WaypointsFilterQuery
  ) {
    const { page, limit } = paginationQueryParams;

    const offset = (page - 1) * limit;

    const count = await this.allWaypointsService.getAllCount(filterParams);
    const pagination = createResponseProperties(offset, limit, count);

    const waypoints = await this.allWaypointsService.findAll(offset, limit, filterParams);
    return new Pagination(waypoints, pagination);
  }
}

import { Injectable } from '@nestjs/common';
import { Waypoint, WaypointsFilterQuery } from '@v2/modules/cases/completed/waypoints/waypoint.interface';

export abstract class AllWaypointsRepositoryInterface {
  abstract findAll(offset: number, limit: number, query?: WaypointsFilterQuery): Promise<Waypoint[]>;
  abstract count(query?: WaypointsFilterQuery): Promise<number>;
}
@Injectable()
export class AllWaypointsService {
  constructor(private readonly waypointRepository: AllWaypointsRepositoryInterface) {}

  async findAll(offset: number, limit: number, query?: WaypointsFilterQuery) {
    return this.waypointRepository.findAll(offset, limit, query);
  }

  async getAllCount(query?: WaypointsFilterQuery) {
    return this.waypointRepository.count(query);
  }
}

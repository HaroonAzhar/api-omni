import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { Waypoint, WaypointsFilterQuery } from './waypoint.interface';
import { WaypointsRepositoryInterface } from './waypoints.service';
import { prepareQueryWithFilter } from './waypoints.repository-utils';
@Injectable()
export class WaypointsRepository extends WaypointsRepositoryInterface {
  private waypointsTable = 'Servicing.Waypoints';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(waypoints: Waypoint): Promise<number> {
    const [Id] = await this.knex(this.waypointsTable).insert(waypoints, ['WaypointId']);
    return Id;
  }

  async findAll(FkCompletedId: number, filterQuery?: WaypointsFilterQuery): Promise<Waypoint[]> {
    const query = prepareQueryWithFilter(
      this.knex(this.waypointsTable).select<Waypoint[]>().where({ FkCompletedId }).orderBy('DueDate', 'asc'),
      filterQuery
    );
    return query;
  }

  async delete(FkCompletedId: number, WaypointId: number): Promise<number> {
    return this.knex(this.waypointsTable).delete().where({ FkCompletedId, WaypointId });
  }

  async get(FkCompletedId: number, WaypointId: number): Promise<Waypoint> {
    const waypoints = await this.knex(this.waypointsTable).select<Waypoint[]>().where({ FkCompletedId, WaypointId });
    return waypoints[0];
  }

  async update(FkCompletedId: number, WaypointId: number, waypoint: Waypoint): Promise<number> {
    delete waypoint.WaypointId;
    return this.knex(this.waypointsTable).update(waypoint).where({ FkCompletedId, WaypointId });
  }
}

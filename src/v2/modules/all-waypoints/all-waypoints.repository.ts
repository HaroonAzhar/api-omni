import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';
import { Waypoint, WaypointsFilterQuery } from '@v2/modules/cases/completed/waypoints/waypoint.interface';
import { prepareQueryWithFilter } from '@v2/modules/cases/completed/waypoints/waypoints.repository-utils';

import { AllWaypointsRepositoryInterface } from './all-waypoints.service';

@Injectable()
export class AllWaypointsRepository extends AllWaypointsRepositoryInterface {
  private waypointsTable = 'Servicing.Waypoints';
  private completedTable = 'Servicing.Completed';
  private casesTable = 'Origination.Case';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async count(filterQuery?: WaypointsFilterQuery): Promise<number> {
    const query = prepareQueryWithFilter(this.knex(this.waypointsTable).count({ count: '*' }), filterQuery);
    const count = await query;
    return count ? count[0].count : 0;
  }

  async findAll(offset: number, limit: number, filterQuery?: WaypointsFilterQuery): Promise<Waypoint[]> {
    const query = prepareQueryWithFilter(
      this.knex(this.waypointsTable)
        .select<Waypoint[]>()
        .leftJoin(this.completedTable, 'FkCompletedId', 'CompletedId')
        .leftJoin(this.casesTable, 'FkCaseId', 'CaseId')
        .orderBy('DueDate', 'asc')
        .offset(offset)
        .limit(limit),
      filterQuery
    );

    return query;
  }
}

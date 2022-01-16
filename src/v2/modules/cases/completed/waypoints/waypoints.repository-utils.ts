import Knex from 'knex';

import { WaypointsFilterQuery } from './waypoint.interface';

export const prepareQueryWithFilter = (query: Knex.QueryBuilder, filterQuery?: WaypointsFilterQuery) => {
  const { Category, DueDateMax, DueDateMin, IsCompleted } = filterQuery;
  if (Category) {
    query = query.where({ Category });
  }
  if (IsCompleted !== undefined) {
    query = query.where({ IsCompleted });
  }
  if (DueDateMin) {
    query = query.where('DueDate', '>', DueDateMin);
  }
  if (DueDateMax) {
    query = query.where('DueDate', '<', DueDateMax);
  }
  return query;
};

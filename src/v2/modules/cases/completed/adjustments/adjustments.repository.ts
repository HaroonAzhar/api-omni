import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';
import Knex from 'knex';

import { Adjustment, AdjustmentsFilterQuery, SaveAdjustment } from './adjustment.interface';
import { AdjustmentsRepositoryInterface } from './adjustments.service';

export const prepareQueryWithFilter = (query: Knex.QueryBuilder, filterQuery?: AdjustmentsFilterQuery) => {
  const { TransactionType, ActualDateMin, ActualDateMax } = filterQuery;
  if (TransactionType) {
    query = query.where({ TransactionType });
  }
  if (ActualDateMin) {
    query = query.where('ActualDate', '>', ActualDateMin);
  }
  if (ActualDateMax) {
    query = query.where('ActualDate', '<', ActualDateMax);
  }
  return query;
};
@Injectable()
export class AdjustmentsRepository extends AdjustmentsRepositoryInterface {
  private adjustmentsTable = 'Servicing.Adjustments';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(adjustments: SaveAdjustment): Promise<number> {
    const [Id] = await this.knex(this.adjustmentsTable).insert(adjustments, ['AdjustmentId']);
    return Id;
  }

  async findAll(
    FkCompletedId: number,
    filterQuery: AdjustmentsFilterQuery = {}
  ): Promise<(Adjustment & { AdjustmentId: number })[]> {
    const query = this.knex(this.adjustmentsTable)
      .select<(Adjustment & { AdjustmentId: number })[]>()
      .where({ FkCompletedId })
      .orderBy('ActualDate');
    return prepareQueryWithFilter(query, filterQuery);
  }

  async findFiltered(filterQuery: AdjustmentsFilterQuery = {}): Promise<(Adjustment & { AdjustmentId: number })[]> {
    const query = this.knex(this.adjustmentsTable)
      .select<(Adjustment & { AdjustmentId: number })[]>()
      .orderBy('ActualDate');
    return prepareQueryWithFilter(query, filterQuery);
  }
}

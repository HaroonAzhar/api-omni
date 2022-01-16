import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { Cashflow, CashflowsFilterQuery } from './cashflow.interface';
import { CashflowsRepositoryInterface } from './cashflows.service';

@Injectable()
export class CashflowsRepository extends CashflowsRepositoryInterface {
  private cashflowsTable = 'Servicing.Cashflows';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(cashflows: Cashflow): Promise<number> {
    const [Id] = await this.knex(this.cashflowsTable).insert(cashflows, ['CashflowId']);
    return Id;
  }

  async findAll(FkCompletedId: number, filterQuery: CashflowsFilterQuery = {}): Promise<Cashflow[]> {
    let query = this.knex(this.cashflowsTable).select<Cashflow[]>().where({ FkCompletedId });
    const { ActualDateMin, ActualDateMax } = filterQuery;
    if (ActualDateMin) {
      query = query.where('ActualDate', '>', ActualDateMin);
    }
    if (ActualDateMax) {
      query = query.where('ActualDate', '<', ActualDateMax);
    }
    return query;
  }
}

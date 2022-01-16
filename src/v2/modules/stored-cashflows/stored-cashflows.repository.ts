import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { CreateStoredCashflowEntity, StoredCashflowEntity } from './stored-cashflow.interface';
import { StoredCashflowsRepositoryInterface } from './stored-cashflows.service';

@Injectable()
export class StoredCashflowsRepository extends StoredCashflowsRepositoryInterface {
  private storedCashflowsTable = 'Servicing.StoredCashflows';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(storedCashflow: CreateStoredCashflowEntity): Promise<number> {
    const [Id] = await this.knex(this.storedCashflowsTable).insert(storedCashflow, ['StoredCashflowId']);
    return Id;
  }

  async findForDates(dateMin: string, dateMax: string): Promise<StoredCashflowEntity[]> {
    const query = this.knex(this.storedCashflowsTable)
      .select<StoredCashflowEntity[]>()
      .where('TransactionDate', '>', dateMin)
      .where('TransactionDate', '<', dateMax)
      .orderBy('TransactionDate');

    return query;
  }
}

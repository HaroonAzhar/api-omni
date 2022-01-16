import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION, KnexInstance } from '@v2/utils/knex';

import { CreateLtvDto, Ltv, LtvRepositoryInterface } from './ltv.interface';

@Injectable()
export class LtvRepository extends LtvRepositoryInterface {
  private table = 'Origination.Ltv';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(record: CreateLtvDto) {
    await this.knex(this.table).insert(record);
  }

  async getNewest(): Promise<Ltv | null> {
    return this.knex(this.table).orderBy('createdAt').first<Ltv>();
  }

  async getHistorical(offset: number, limit: number): Promise<Ltv[] | null> {
    const query = this.knex(this.table).orderBy('CreatedAt', 'desc').offset(offset).limit(limit);

    return query.select<Ltv[]>();
  }

  async getHistoricalCount(): Promise<number> {
    const count = await this.knex(this.table).count({ count: '*' });

    return count ? count[0].count : 0;
  }
}

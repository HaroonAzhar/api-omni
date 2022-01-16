import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { CreateFurtherDrawdownEntity, FurtherDrawdownEntity } from './further-drawdown.interface';
import { FurtherDrawdownsRepositoryInterface } from './further-drawdowns.service';

@Injectable()
export class FurtherDrawdownsRepository extends FurtherDrawdownsRepositoryInterface {
  private furtherDrawdownsTable = 'Servicing.FurtherDrawdowns';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(furtherDrawdown: CreateFurtherDrawdownEntity): Promise<number> {
    const [Id] = await this.knex(this.furtherDrawdownsTable).insert(furtherDrawdown, ['FurtherDrawdownId']);
    return Id;
  }

  async findAll(FkCompletedId: number): Promise<FurtherDrawdownEntity[]> {
    const query = this.knex(this.furtherDrawdownsTable)
      .select<FurtherDrawdownEntity[]>()
      .where({ FkCompletedId })
      .orderBy('RequestedDate');

    return query;
  }

  async get(FkCompletedId: number, FurtherDrawdownId: number): Promise<FurtherDrawdownEntity> {
    const [furtherDrawdown] = await this.knex(this.furtherDrawdownsTable)
      .select<FurtherDrawdownEntity[]>()
      .where({ FkCompletedId, FurtherDrawdownId })
      .orderBy('RequestedDate');

    return furtherDrawdown;
  }
}

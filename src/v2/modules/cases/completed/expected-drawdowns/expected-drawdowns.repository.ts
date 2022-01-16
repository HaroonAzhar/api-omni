import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateExpectedDrawdownEntity,
  ExpectedDrawdownEntity,
  UpdateExpectedDrawdownEntity,
} from './expected-drawdown.interface';
import { ExpectedDrawdownsRepositoryInterface } from './expected-drawdowns.service';

@Injectable()
export class ExpectedDrawdownsRepository extends ExpectedDrawdownsRepositoryInterface {
  private expectedDrawdownsTable = 'Servicing.ExpectedDrawdowns';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(expectedDrawdown: CreateExpectedDrawdownEntity): Promise<number> {
    const [Id] = await this.knex(this.expectedDrawdownsTable).insert(expectedDrawdown, ['ExpectedDrawdownId']);
    return Id;
  }

  async findAll(FkCompletedId: number): Promise<ExpectedDrawdownEntity[]> {
    const query = this.knex(this.expectedDrawdownsTable)
      .select<ExpectedDrawdownEntity[]>()
      .where({ FkCompletedId })
      .orderBy('Date');

    return query;
  }

  async get(FkCompletedId: number, ExpectedDrawdownId: number): Promise<ExpectedDrawdownEntity> {
    const [expectedDrawdown] = await this.knex(this.expectedDrawdownsTable)
      .select<ExpectedDrawdownEntity[]>()
      .where({ FkCompletedId, ExpectedDrawdownId })
      .orderBy('Date');

    return expectedDrawdown;
  }

  async update(expectedDrawdown: UpdateExpectedDrawdownEntity): Promise<void> {
    const { ExpectedDrawdownId, FkCompletedId, ...rest } = expectedDrawdown;

    await this.knex(this.expectedDrawdownsTable).update(rest).where({ ExpectedDrawdownId, FkCompletedId });
  }

  async delete(FkCompletedId: number, ExpectedDrawdownId: number): Promise<void> {
    await this.knex(this.expectedDrawdownsTable).delete().where({ FkCompletedId, ExpectedDrawdownId });
  }

  async findForDates(dateMin: string, dateMax: string): Promise<ExpectedDrawdownEntity[]> {
    const query = this.knex(this.expectedDrawdownsTable)
      .select<ExpectedDrawdownEntity[]>()
      .where('Date', '>', dateMin)
      .where('Date', '<', dateMax)
      .orderBy('Date');

    return query;
  }
}

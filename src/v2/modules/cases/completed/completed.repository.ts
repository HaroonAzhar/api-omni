import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { Completed } from './completed.interface';
import { CompletedRepositoryInterface } from './completed.service';

@Injectable()
export class CompletedRepository extends CompletedRepositoryInterface {
  private completedTable = 'Servicing.Completed';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  private getQuery() {
    return this.knex(this.completedTable).select<Completed[]>();
  }
  async getByCaseId(FkCaseId: number) {
    const [matchingCompleted] = await this.getQuery().where({ FkCaseId });
    return matchingCompleted;
  }

  async getById(CompletedId: number) {
    const [matchingCompleted] = await this.getQuery().where({ CompletedId });
    return matchingCompleted;
  }

  async create(completed: Completed): Promise<number> {
    const [Id] = await this.knex(this.completedTable).insert(completed, ['CompletedId']);
    return Id;
  }

  async update(completed: Completed): Promise<void> {
    await this.knex(this.completedTable).update(completed).where({ FkCaseId: completed.FkCaseId });
  }
}

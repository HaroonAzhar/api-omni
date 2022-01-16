import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { ManualStatus, ManualStatusesRepositoryInterface } from './manual-status.interface';

@Injectable()
export class ManualStatusesRepository extends ManualStatusesRepositoryInterface {
  private manualStatusTable = 'Servicing.ManualStatuses';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(manualStatus: ManualStatus): Promise<number> {
    const [Id] = await this.knex(this.manualStatusTable).insert(manualStatus, ['ManualStatusId']);
    return Id;
  }

  async findAll(FkCompletedId: number): Promise<ManualStatus[]> {
    const query = this.knex(this.manualStatusTable).select<ManualStatus[]>().where({ FkCompletedId });

    return query.orderBy('EffectiveFrom');
  }

  async update(FkCompletedId: number, ManualStatusId: number, manualStatus: Partial<ManualStatus>): Promise<void> {
    delete manualStatus.ManualStatusId;

    await this.knex(this.manualStatusTable).update(manualStatus).where({ ManualStatusId, FkCompletedId });
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { CreateFurtherAdvanceEntity, FurtherAdvanceEntity } from './further-advance.interface';
import { FurtherAdvancesRepositoryInterface } from './further-advances.service';

@Injectable()
export class FurtherAdvancesRepository extends FurtherAdvancesRepositoryInterface {
  private furtherAdvancesTable = 'Servicing.FurtherAdvances';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(furtherAdvance: CreateFurtherAdvanceEntity): Promise<number> {
    const [Id] = await this.knex(this.furtherAdvancesTable).insert(furtherAdvance, ['FurtherAdvanceId']);
    return Id;
  }

  async findAll(FkCompletedId: number): Promise<FurtherAdvanceEntity[]> {
    const query = this.knex(this.furtherAdvancesTable)
      .select<FurtherAdvanceEntity[]>()
      .where({ FkCompletedId })
      .orderBy('RequestedDate');

    return query;
  }

  async get(FkCompletedId: number, FurtherAdvanceId: number): Promise<FurtherAdvanceEntity> {
    const [furtherAdvance] = await this.knex(this.furtherAdvancesTable)
      .select<FurtherAdvanceEntity[]>()
      .where({ FkCompletedId, FurtherAdvanceId })
      .orderBy('RequestedDate');

    return furtherAdvance;
  }
}

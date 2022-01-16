import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateOriginationChecklistEntity,
  OriginationChecklistEntity,
  OriginationChecklistRepositoryInterface,
} from './origination-checklist.interface';

@Injectable()
export class OriginationChecklistRepository extends OriginationChecklistRepositoryInterface {
  private originationChecklistSolicitorsTable = 'Servicing.OriginationChecklists';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(originationChecklist: CreateOriginationChecklistEntity): Promise<number> {
    const [Id] = await this.knex(this.originationChecklistSolicitorsTable).insert(originationChecklist, [
      'OriginationChecklistId',
    ]);
    return Id;
  }

  async get(FkFurtherId: number, FurtherType: string): Promise<OriginationChecklistEntity> {
    const [originationChecklist] = await this.knex(this.originationChecklistSolicitorsTable)
      .select<OriginationChecklistEntity[]>()
      .where({ FkFurtherId, FurtherType });
    return originationChecklist;
  }

  async update(
    OriginationChecklistId: number,
    originationChecklist: Partial<OriginationChecklistEntity>
  ): Promise<void> {
    await this.knex(this.originationChecklistSolicitorsTable)
      .update(originationChecklist)
      .where({ OriginationChecklistId });
  }
}

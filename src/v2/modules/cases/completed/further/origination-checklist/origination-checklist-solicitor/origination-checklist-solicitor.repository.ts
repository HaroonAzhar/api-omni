import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateOriginationChecklistSolicitorEntity,
  OriginationChecklistSolicitorEntity,
  UpdateOriginationChecklistSolicitorEntity,
} from './origination-checklist-solicitor.interface';
import { OriginationChecklistSolicitorRepositoryInterface } from './origination-checklist-solicitor.service';

@Injectable()
export class OriginationChecklistSolicitorRepository extends OriginationChecklistSolicitorRepositoryInterface {
  private originationChecklistSolicitorsTable = 'Servicing.OriginationChecklistSolicitors';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(solicitor: CreateOriginationChecklistSolicitorEntity): Promise<number> {
    const [Id] = await this.knex(this.originationChecklistSolicitorsTable).insert(solicitor, [
      'OriginationChecklistSolicitorId',
    ]);
    return Id;
  }

  async update(FkOriginationChecklistId: number, solicitor: UpdateOriginationChecklistSolicitorEntity): Promise<void> {
    await this.knex(this.originationChecklistSolicitorsTable).update(solicitor).where({ FkOriginationChecklistId });
  }

  async get(FkOriginationChecklistId: number): Promise<OriginationChecklistSolicitorEntity> {
    const [solicitor] = await this.knex(this.originationChecklistSolicitorsTable)
      .select<OriginationChecklistSolicitorEntity[]>()
      .where({ FkOriginationChecklistId });

    return solicitor;
  }
}

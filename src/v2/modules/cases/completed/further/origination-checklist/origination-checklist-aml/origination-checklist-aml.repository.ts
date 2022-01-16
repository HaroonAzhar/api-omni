import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateOriginationChecklistAmlEntity,
  OriginationChecklistAmlEntity,
  UpdateOriginationChecklistAmlEntity,
} from './origination-checklist-aml.interface';
import { OriginationChecklistAmlRepositoryInterface } from './origination-checklist-aml.service';

@Injectable()
export class OriginationChecklistAmlRepository extends OriginationChecklistAmlRepositoryInterface {
  private originationChecklistAmlTable = 'Servicing.OriginationChecklistAmls';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(aml: CreateOriginationChecklistAmlEntity): Promise<number> {
    const [Id] = await this.knex(this.originationChecklistAmlTable).insert(aml, ['OriginationChecklistAmlId']);
    return Id;
  }

  async update(FkOriginationChecklistId: number, aml: UpdateOriginationChecklistAmlEntity): Promise<void> {
    await this.knex(this.originationChecklistAmlTable).update(aml).where({ FkOriginationChecklistId });
  }

  async get(FkOriginationChecklistId: number): Promise<OriginationChecklistAmlEntity> {
    const [aml] = await this.knex(this.originationChecklistAmlTable)
      .select<OriginationChecklistAmlEntity[]>()
      .where({ FkOriginationChecklistId });

    return aml;
  }
}

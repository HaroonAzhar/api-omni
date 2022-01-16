import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateOriginationChecklistExperianEntity,
  OriginationChecklistExperianEntity,
  UpdateOriginationChecklistExperianEntity,
} from './origination-checklist-experian.interface';
import { OriginationChecklistExperianRepositoryInterface } from './origination-checklist-experian.service';

@Injectable()
export class OriginationChecklistExperianRepository extends OriginationChecklistExperianRepositoryInterface {
  private originationChecklistExperianTable = 'Servicing.OriginationChecklistExperians';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(experian: CreateOriginationChecklistExperianEntity): Promise<number> {
    const [Id] = await this.knex(this.originationChecklistExperianTable).insert(experian, [
      'OriginationChecklistExperianId',
    ]);
    return Id;
  }

  async update(FkOriginationChecklistId: number, experian: UpdateOriginationChecklistExperianEntity): Promise<void> {
    await this.knex(this.originationChecklistExperianTable).update(experian).where({ FkOriginationChecklistId });
  }

  async get(FkOriginationChecklistId: number): Promise<OriginationChecklistExperianEntity> {
    const [experian] = await this.knex(this.originationChecklistExperianTable)
      .select<OriginationChecklistExperianEntity[]>()
      .where({ FkOriginationChecklistId });

    return experian;
  }
}

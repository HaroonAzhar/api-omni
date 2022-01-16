import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateOriginationChecklistReinspectionValuationEntity,
  OriginationChecklistReinspectionValuationEntity,
  UpdateOriginationChecklistReinspectionValuationEntity,
} from './origination-checklist-reinspection-valuation.interface';
import { OriginationChecklistReinspectionValuationRepositoryInterface } from './origination-checklist-reinspection-valuation.service';

@Injectable()
export class OriginationChecklistReinspectionValuationRepository extends OriginationChecklistReinspectionValuationRepositoryInterface {
  private originationChecklistReinspectionValuationsTable = 'Servicing.OriginationChecklistReinspectionValuations';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(reinspectionValuation: CreateOriginationChecklistReinspectionValuationEntity): Promise<number> {
    const [Id] = await this.knex(this.originationChecklistReinspectionValuationsTable).insert(reinspectionValuation, [
      'OriginationChecklistReinspectionValuationId',
    ]);
    return Id;
  }

  async update(
    FkOriginationChecklistId: number,
    reinspectionValuation: UpdateOriginationChecklistReinspectionValuationEntity
  ): Promise<void> {
    await this.knex(this.originationChecklistReinspectionValuationsTable)
      .update(reinspectionValuation)
      .where({ FkOriginationChecklistId });
  }

  async get(FkOriginationChecklistId: number): Promise<OriginationChecklistReinspectionValuationEntity> {
    const [reinspectionValuation] = await this.knex(this.originationChecklistReinspectionValuationsTable)
      .select<OriginationChecklistReinspectionValuationEntity[]>()
      .where({ FkOriginationChecklistId });

    return reinspectionValuation;
  }
}

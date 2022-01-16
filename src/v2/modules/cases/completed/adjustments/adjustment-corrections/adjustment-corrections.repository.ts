import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { AdjustmentCorrection } from './adjustment-correction.interface';
import { AdjustmentCorrectionsRepositoryInterface } from './adjustment-corrections.service';

@Injectable()
export class AdjustmentCorrectionsRepository extends AdjustmentCorrectionsRepositoryInterface {
  private adjustmentCorrectionsTable = 'Servicing.AdjustmentCorrections';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(adjustmentCorrections: AdjustmentCorrection): Promise<number> {
    const [Id] = await this.knex(this.adjustmentCorrectionsTable).insert(adjustmentCorrections, [
      'AdjustmentCorrectionId',
    ]);
    return Id;
  }

  async findAll(FkAdjustmentId: number): Promise<AdjustmentCorrection[]> {
    const query = this.knex(this.adjustmentCorrectionsTable)
      .select<AdjustmentCorrection[]>()
      .where({ FkAdjustmentId })
      .orderBy('CreatedDate');
    return query;
  }
}

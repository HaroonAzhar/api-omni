import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateOriginationChecklistLandChargesEntity,
  OriginationChecklistLandChargesEntity,
  UpdateOriginationChecklistLandChargesEntity,
  OriginationChecklistLandChargesResultEntity,
  CreateOriginationChecklistLandChargesResultEntity,
} from './origination-checklist-land-charges.interface';
import { OriginationChecklistLandChargesRepositoryInterface } from './origination-checklist-land-charges.service';

@Injectable()
export class OriginationChecklistLandChargesRepository extends OriginationChecklistLandChargesRepositoryInterface {
  private originationChecklistLandChargessTable = 'Servicing.OriginationChecklistLandCharges';
  private resultsTable = 'Servicing.OriginationChecklistLandChargesResults';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(landCharges: CreateOriginationChecklistLandChargesEntity): Promise<number> {
    const [Id] = await this.knex(this.originationChecklistLandChargessTable).insert(landCharges, [
      'OriginationChecklistLandChargesId',
    ]);
    return Id;
  }

  async update(
    FkOriginationChecklistId: number,
    landCharges: UpdateOriginationChecklistLandChargesEntity
  ): Promise<void> {
    await this.knex(this.originationChecklistLandChargessTable).update(landCharges).where({ FkOriginationChecklistId });
  }

  async get(FkOriginationChecklistId: number): Promise<OriginationChecklistLandChargesEntity> {
    const [landCharges] = await this.knex(this.originationChecklistLandChargessTable)
      .select<OriginationChecklistLandChargesEntity[]>()
      .where({ FkOriginationChecklistId });

    return landCharges;
  }

  async getResults(
    FkOriginationChecklistLandChargesId: number
  ): Promise<OriginationChecklistLandChargesResultEntity[]> {
    return this.knex(this.resultsTable)
      .select<OriginationChecklistLandChargesResultEntity[]>()
      .where({ FkOriginationChecklistLandChargesId });
  }
  async addResult(
    FkOriginationChecklistLandChargesId: number,
    result: CreateOriginationChecklistLandChargesResultEntity
  ): Promise<number> {
    return this.knex(this.resultsTable).insert({ ...result, FkOriginationChecklistLandChargesId });
  }

  async updateResult(
    OriginationChecklistLandChargesResultsId: number,
    result: CreateOriginationChecklistLandChargesResultEntity
  ): Promise<number> {
    return this.knex(this.resultsTable).update(result).where({ OriginationChecklistLandChargesResultsId });
  }
}

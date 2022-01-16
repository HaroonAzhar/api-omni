import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateEstimatedRedemptionEntity,
  EstimatedRedemptionEntity,
  UpdateEstimatedRedemptionEntity,
} from './estimated-redemption.interface';
import { EstimatedRedemptionsRepositoryInterface } from './estimated-redemptions.service';

@Injectable()
export class EstimatedRedemptionsRepository extends EstimatedRedemptionsRepositoryInterface {
  private estimatedRedemptionsTable = 'Servicing.EstimatedRedemptions';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(estimatedRedemption: CreateEstimatedRedemptionEntity): Promise<number> {
    const [Id] = await this.knex(this.estimatedRedemptionsTable).insert(estimatedRedemption, ['EstimatedRedemptionId']);
    return Id;
  }

  async findAll(FkCompletedId: number): Promise<EstimatedRedemptionEntity[]> {
    const query = this.knex(this.estimatedRedemptionsTable)
      .select<EstimatedRedemptionEntity[]>()
      .where({ FkCompletedId })
      .orderBy('Date');

    return query;
  }

  async get(FkCompletedId: number, EstimatedRedemptionId: number): Promise<EstimatedRedemptionEntity> {
    const [estimatedRedemption] = await this.knex(this.estimatedRedemptionsTable)
      .select<EstimatedRedemptionEntity[]>()
      .where({ FkCompletedId, EstimatedRedemptionId })
      .orderBy('Date');

    return estimatedRedemption;
  }

  async update(estimatedRedemption: UpdateEstimatedRedemptionEntity): Promise<void> {
    const { EstimatedRedemptionId, FkCompletedId, ...rest } = estimatedRedemption;

    await this.knex(this.estimatedRedemptionsTable).update(rest).where({ EstimatedRedemptionId, FkCompletedId });
  }

  async delete(FkCompletedId: number, EstimatedRedemptionId: number): Promise<void> {
    await this.knex(this.estimatedRedemptionsTable).delete().where({ FkCompletedId, EstimatedRedemptionId });
  }

  async findForDates(dateMin: string, dateMax: string): Promise<EstimatedRedemptionEntity[]> {
    const query = this.knex(this.estimatedRedemptionsTable)
      .select<EstimatedRedemptionEntity[]>()
      .where('Date', '>', dateMin)
      .where('Date', '<', dateMax)
      .orderBy('Date');

    return query;
  }
}

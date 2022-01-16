import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateOriginationChecklistInsuranceEntity,
  OriginationChecklistInsuranceEntity,
  UpdateOriginationChecklistInsuranceEntity,
} from './origination-checklist-insurance.interface';
import { OriginationChecklistInsuranceRepositoryInterface } from './origination-checklist-insurance.service';

@Injectable()
export class OriginationChecklistInsuranceRepository extends OriginationChecklistInsuranceRepositoryInterface {
  private originationChecklistInsurancesTable = 'Servicing.OriginationChecklistInsurances';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(insurance: CreateOriginationChecklistInsuranceEntity): Promise<number> {
    const [Id] = await this.knex(this.originationChecklistInsurancesTable).insert(insurance, [
      'OriginationChecklistInsuranceId',
    ]);
    return Id;
  }

  async update(FkOriginationChecklistId: number, insurance: UpdateOriginationChecklistInsuranceEntity): Promise<void> {
    await this.knex(this.originationChecklistInsurancesTable).update(insurance).where({ FkOriginationChecklistId });
  }

  async get(FkOriginationChecklistId: number): Promise<OriginationChecklistInsuranceEntity> {
    const [insurance] = await this.knex(this.originationChecklistInsurancesTable)
      .select<OriginationChecklistInsuranceEntity[]>()
      .where({ FkOriginationChecklistId });

    return insurance;
  }
}

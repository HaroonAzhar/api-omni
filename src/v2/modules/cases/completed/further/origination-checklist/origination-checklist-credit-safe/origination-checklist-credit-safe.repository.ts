import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateOriginationChecklistCreditSafeEntity,
  OriginationChecklistCreditSafeEntity,
  UpdateOriginationChecklistCreditSafeEntity,
} from './origination-checklist-credit-safe.interface';
import { OriginationChecklistCreditSafeRepositoryInterface } from './origination-checklist-credit-safe.service';

@Injectable()
export class OriginationChecklistCreditSafeRepository extends OriginationChecklistCreditSafeRepositoryInterface {
  private originationChecklistCreditSafesTable = 'Servicing.OriginationChecklistCreditSafes';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(creditSafe: CreateOriginationChecklistCreditSafeEntity): Promise<number> {
    const [Id] = await this.knex(this.originationChecklistCreditSafesTable).insert(creditSafe, [
      'OriginationChecklistCreditSafeId',
    ]);
    return Id;
  }

  async update(
    FkOriginationChecklistId: number,
    creditSafe: UpdateOriginationChecklistCreditSafeEntity
  ): Promise<void> {
    await this.knex(this.originationChecklistCreditSafesTable).update(creditSafe).where({ FkOriginationChecklistId });
  }

  async get(FkOriginationChecklistId: number): Promise<OriginationChecklistCreditSafeEntity> {
    const [creditSafe] = await this.knex(this.originationChecklistCreditSafesTable)
      .select<OriginationChecklistCreditSafeEntity[]>()
      .where({ FkOriginationChecklistId });

    return creditSafe;
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { SecurityValuationEntity, CreateSecurityValuationEntity } from './security-valuations.interface';
import { SecurityValuationsRepositoryInterface } from './security-valuations.service';

@Injectable()
export class SecurityValuationsRepository extends SecurityValuationsRepositoryInterface {
  private SecurityValuationsTable = 'Servicing.SecurityValuations';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(securityValuation: CreateSecurityValuationEntity): Promise<number> {
    const [Id] = await this.knex(this.SecurityValuationsTable).insert(securityValuation, ['SecurityValuationId']);
    return Id;
  }

  async findAll(FkSecurityId: number): Promise<SecurityValuationEntity[]> {
    const query = this.knex(this.SecurityValuationsTable)
      .select<SecurityValuationEntity[]>()
      .where({ FkSecurityId })
      .orderBy('ValuationDate');

    return query;
  }
}

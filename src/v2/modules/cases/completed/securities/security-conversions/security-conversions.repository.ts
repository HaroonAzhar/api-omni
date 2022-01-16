import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { SecurityConversionEntity, CreateSecurityConversionEntity } from './security-conversions.interface';
import { SecurityConversionsRepositoryInterface } from './security-conversions.service';

@Injectable()
export class SecurityConversionsRepository extends SecurityConversionsRepositoryInterface {
  private SecurityConversionsTable = 'Servicing.SecurityConversions';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(securityConversion: CreateSecurityConversionEntity): Promise<number> {
    const [Id] = await this.knex(this.SecurityConversionsTable).insert(securityConversion, ['SecurityConversionId']);
    return Id;
  }

  async findAll(FkSecurityId: number): Promise<SecurityConversionEntity[]> {
    const query = this.knex(this.SecurityConversionsTable).select<SecurityConversionEntity[]>().where({ FkSecurityId });

    return query;
  }
}

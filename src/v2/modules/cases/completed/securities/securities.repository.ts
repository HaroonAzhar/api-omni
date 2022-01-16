import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { SecurityEntity, Security } from './security.interface';
import { SecuritiesRepositoryInterface } from './securities.service';

@Injectable()
export class SecuritiesRepository extends SecuritiesRepositoryInterface {
  private SecuritiesTable = 'Servicing.Securities';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(Securities: Security): Promise<number> {
    const [Id] = await this.knex(this.SecuritiesTable).insert(Securities, ['SecurityId']);
    return Id;
  }

  async findAll(FkCompletedId: number): Promise<SecurityEntity[]> {
    const query = this.knex(this.SecuritiesTable).select<SecurityEntity[]>().where({ FkCompletedId });

    return query;
  }

  async get(SecurityId: number): Promise<SecurityEntity> {
    const [security] = await this.knex(this.SecuritiesTable).select<SecurityEntity[]>().where({ SecurityId });

    return security;
  }
}

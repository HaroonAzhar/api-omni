import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { SecurityReleaseEntity, CreateSecurityReleaseEntity } from './security-releases.interface';
import { SecurityReleasesRepositoryInterface } from './security-releases.service';

@Injectable()
export class SecurityReleasesRepository extends SecurityReleasesRepositoryInterface {
  private SecurityReleasesTable = 'Servicing.SecurityReleases';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(securityRelease: CreateSecurityReleaseEntity): Promise<number> {
    const [Id] = await this.knex(this.SecurityReleasesTable).insert(securityRelease, ['SecurityReleaseId']);
    return Id;
  }

  async findAll(FkSecurityId: number): Promise<SecurityReleaseEntity[]> {
    const query = this.knex(this.SecurityReleasesTable).select<SecurityReleaseEntity[]>().where({ FkSecurityId });

    return query;
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION, KnexInstance } from '@v2/utils/knex';

import { BaseAdminRepository } from '../baseGeneric/baseAdmin.repository';
import { UnderwritersRepositoryInterface, UnderwriterEntity } from './underwriters.service';

@Injectable()
export class UnderwritersRepository extends BaseAdminRepository<UnderwriterEntity>
  implements UnderwritersRepositoryInterface {
  constructor(@Inject(KNEX_CONNECTION) knex: KnexInstance) {
    super(knex, 'OriginationAdmin.Underwriters');
  }
}

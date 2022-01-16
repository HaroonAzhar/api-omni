import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION, KnexInstance } from '@v2/utils/knex';

import { BaseAdminRepository } from '../baseGeneric/baseAdmin.repository';
import { OriginatorsRepositoryInterface, OriginatorEntity } from './originators.service';

@Injectable()
export class OriginatorsRepository extends BaseAdminRepository<OriginatorEntity>
  implements OriginatorsRepositoryInterface {
  constructor(@Inject(KNEX_CONNECTION) knex: KnexInstance) {
    super(knex, 'OriginationAdmin.Originators');
  }
}

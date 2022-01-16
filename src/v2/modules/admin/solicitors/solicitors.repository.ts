import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION, KnexInstance } from '@v2/utils/knex';

import { BaseAdminRepository } from '../baseGeneric/baseAdmin.repository';
import { SolicitorsRepositoryInterface, SolicitorEntity } from './solicitors.service';

@Injectable()
export class SolicitorsRepository extends BaseAdminRepository<SolicitorEntity>
  implements SolicitorsRepositoryInterface {
  constructor(@Inject(KNEX_CONNECTION) knex: KnexInstance) {
    super(knex, 'OriginationAdmin.Solicitors');
  }
}

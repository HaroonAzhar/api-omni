import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION, KnexInstance } from '@v2/utils/knex';

import { BaseAdminRepository } from '../baseGeneric/baseAdmin.repository';
import { WaypointNamesRepositoryInterface, WaypointNameEntity } from './waypoint-name.service';

@Injectable()
export class WaypointNamesRepository extends BaseAdminRepository<WaypointNameEntity>
  implements WaypointNamesRepositoryInterface {
  constructor(@Inject(KNEX_CONNECTION) knex: KnexInstance) {
    super(knex, 'OriginationAdmin.WaypointNames');
  }
}

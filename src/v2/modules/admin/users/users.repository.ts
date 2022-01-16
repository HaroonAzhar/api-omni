import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION, KnexInstance } from '@v2/utils/knex';

import { BaseAdminRepository } from '../baseGeneric/baseAdmin.repository';
import { UsersRepositoryInterface, UserEntity } from './users.service';

@Injectable()
export class UsersRepository extends BaseAdminRepository<UserEntity> implements UsersRepositoryInterface {
  constructor(@Inject(KNEX_CONNECTION) knex: KnexInstance) {
    super(knex, 'OriginationAdmin.Users');
  }
}

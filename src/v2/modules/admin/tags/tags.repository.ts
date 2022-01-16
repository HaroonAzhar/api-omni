import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION, KnexInstance } from '@v2/utils/knex';

import { Tag } from './tag.interface';
import { BaseAdminRepository } from '../baseGeneric/baseAdmin.repository';
import { TagsRepositoryInterface, TagEntity } from './tags.service';

@Injectable()
export class TagsRepository extends BaseAdminRepository<TagEntity> implements TagsRepositoryInterface {
  constructor(@Inject(KNEX_CONNECTION) knex: KnexInstance) {
    super(knex, 'OriginationAdmin.Tags');
  }
  async getTagsByIds(ids: number[]): Promise<Tag[]> {
    return await this.knex('OriginationAdmin.Tags').whereIn('Id', ids);
  }
}

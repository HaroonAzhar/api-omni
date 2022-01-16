import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { AssociatedTagsRepositoryInterface } from './associated-tags.service';

@Injectable()
export class AssociatedTagsRepository extends AssociatedTagsRepositoryInterface {
  private associatedCasesAndTagsTable = 'Origination.AssociatedCasesAndTags';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async getAllTagsIdsForCase(CaseId: number): Promise<number[]> {
    const ids = await this.knex(this.associatedCasesAndTagsTable).select('FkTagId').where('FkCaseId', CaseId);
    const idsValues = ids.map((item) => item.FkTagId);
    return idsValues;
  }
  async addTagToCase(CaseId: number, TagId: number): Promise<number> {
    const [Id] = await this.knex(this.associatedCasesAndTagsTable).insert({ FkCaseId: CaseId, FkTagId: TagId }, ['Id']);
    return Id;
  }
  async removeAssociatedTag(CaseId: number, TagId: number): Promise<number> {
    return this.knex(this.associatedCasesAndTagsTable).delete().where({ FkCaseId: CaseId, FkTagId: TagId });
  }
}

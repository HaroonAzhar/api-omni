import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateOriginationChecklistDocumentsEntity,
  OriginationChecklistDocumentsEntity,
  UpdateOriginationChecklistDocumentsEntity,
} from './origination-checklist-documents.interface';
import { OriginationChecklistDocumentsRepositoryInterface } from './origination-checklist-documents.service';

@Injectable()
export class OriginationChecklistDocumentsRepository extends OriginationChecklistDocumentsRepositoryInterface {
  private originationChecklistDocumentsTable = 'Servicing.OriginationChecklistDocuments';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(documents: CreateOriginationChecklistDocumentsEntity): Promise<number> {
    const [Id] = await this.knex(this.originationChecklistDocumentsTable).insert(documents, [
      'OriginationChecklistDocumentsId',
    ]);
    return Id;
  }

  async update(FkOriginationChecklistId: number, documents: UpdateOriginationChecklistDocumentsEntity): Promise<void> {
    await this.knex(this.originationChecklistDocumentsTable).update(documents).where({ FkOriginationChecklistId });
  }

  async get(FkOriginationChecklistId: number): Promise<OriginationChecklistDocumentsEntity> {
    const [documents] = await this.knex(this.originationChecklistDocumentsTable)
      .select<OriginationChecklistDocumentsEntity[]>()
      .where({ FkOriginationChecklistId });

    return documents;
  }
}

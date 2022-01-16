import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { SecurityNoteEntity, CreateSecurityNoteEntity } from './security-notes.interface';
import { SecurityNotesRepositoryInterface } from './security-notes.service';

@Injectable()
export class SecurityNotesRepository extends SecurityNotesRepositoryInterface {
  private SecurityNotesTable = 'Servicing.SecurityNotes';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(securityNote: CreateSecurityNoteEntity): Promise<number> {
    const [Id] = await this.knex(this.SecurityNotesTable).insert(securityNote, ['SecurityNoteId']);
    return Id;
  }

  async findAll(FkSecurityId: number): Promise<SecurityNoteEntity[]> {
    const query = this.knex(this.SecurityNotesTable).select<SecurityNoteEntity[]>().where({ FkSecurityId });

    return query;
  }
}

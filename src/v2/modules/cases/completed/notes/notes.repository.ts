import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { Note, NotesFilterQuery } from './note.interface';
import { NotesRepositoryInterface } from './notes.service';

@Injectable()
export class NotesRepository extends NotesRepositoryInterface {
  private notesTable = 'Servicing.Notes';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(notes: Note): Promise<number> {
    const [Id] = await this.knex(this.notesTable).insert(notes, ['NoteId']);
    return Id;
  }

  async findAll(FkCompletedId: number, filterQuery?: NotesFilterQuery): Promise<Note[]> {
    let query = this.knex(this.notesTable).select<Note[]>().where({ FkCompletedId });
    const { CreatedBy, CreatedDateMax, CreatedDateMin } = filterQuery;

    if (CreatedBy) {
      query = query.where('CreatedBy', 'like', `%${CreatedBy}%`);
    }
    if (CreatedDateMin) {
      query = query.where('CreatedDate', '>', CreatedDateMin);
    }
    if (CreatedDateMax) {
      query = query.where('CreatedDate', '<', CreatedDateMax);
    }
    return query;
  }

  async delete(FkCompletedId: number, NoteId: number): Promise<number> {
    return this.knex(this.notesTable).delete().where({ FkCompletedId, NoteId });
  }

  async update(FkCompletedId: number, NoteId: number, note: Note): Promise<number> {
    delete note.NoteId;
    return this.knex(this.notesTable).update(note).where({ FkCompletedId, NoteId });
  }
}

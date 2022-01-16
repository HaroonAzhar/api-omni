import { Injectable } from '@nestjs/common';

import { CompletedIdentificationService } from '../completed-identification.service';
import { Note, NotesFilterQuery } from './note.interface';

export abstract class NotesRepositoryInterface {
  abstract create(note: Note): Promise<number>;
  abstract findAll(FkCompletedId: number, query: NotesFilterQuery): Promise<Note[]>;
  abstract delete(FkCompletedId: number, noteId: number): Promise<number>;
  abstract update(FkCompletedId: number, noteId: number, note: Note): Promise<number>;
}

@Injectable()
export class NotesService {
  constructor(
    private readonly noteRepository: NotesRepositoryInterface,
    private readonly completedService: CompletedIdentificationService
  ) {}

  private async getCompletedId(caseUuid: string): Promise<number> {
    return await this.completedService.getIdByCaseUuid(caseUuid);
  }

  async createNote(caseUuid: string, note: Note) {
    const FkCompletedId = await this.getCompletedId(caseUuid);

    return this.noteRepository.create({ FkCompletedId, ...note });
  }

  async getNotes(caseUuid: string, query?: NotesFilterQuery) {
    const CompletedId = await this.getCompletedId(caseUuid);

    return this.noteRepository.findAll(CompletedId, query);
  }

  async deleteNote(caseUuid: string, noteId: number) {
    const CompletedId = await this.getCompletedId(caseUuid);
    return this.noteRepository.delete(CompletedId, noteId);
  }

  async updateNote(caseUuid: string, noteId: number, note: Note) {
    const CompletedId = await this.getCompletedId(caseUuid);
    return this.noteRepository.update(CompletedId, noteId, note);
  }
}

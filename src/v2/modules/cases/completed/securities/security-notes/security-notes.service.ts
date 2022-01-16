import { Injectable } from '@nestjs/common';

import {
  SecurityNote,
  SecurityNoteEntity,
  CreateSecurityNoteEntity,
  CreateSecurityNote,
} from './security-notes.interface';

export abstract class SecurityNotesRepositoryInterface {
  abstract create(securityNote: CreateSecurityNoteEntity): Promise<number>;
  abstract findAll(FkCompletedId: number): Promise<SecurityNoteEntity[]>;
}

@Injectable()
export class SecurityNotesService {
  constructor(private readonly securityNoteRepository: SecurityNotesRepositoryInterface) {}

  async createSecurityNote(FkSecurityId: number, securityNote: CreateSecurityNote): Promise<number> {
    return this.securityNoteRepository.create({ FkSecurityId, ...securityNote });
  }

  async getSecurityNotes(FkSecurityId: number): Promise<SecurityNote[]> {
    return this.securityNoteRepository.findAll(FkSecurityId);
  }
}

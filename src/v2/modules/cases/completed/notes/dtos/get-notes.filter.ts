import { IsISO8601, IsOptional, IsString } from 'class-validator';

import { NotesFilterQuery } from '../note.interface';

export class GetNotesFilter implements NotesFilterQuery {
  @IsString()
  @IsOptional()
  CreatedBy?: string;

  @IsISO8601({ strict: false })
  @IsOptional()
  CreatedDateMin?: string;

  @IsISO8601({ strict: false })
  @IsOptional()
  CreatedDateMax?: string;
}

import { IsString } from 'class-validator';

import { Note } from '../note.interface';

export class UpdateNoteDto implements Note {
  @IsString()
  Text: string;
}

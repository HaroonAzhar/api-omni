import { IsString } from 'class-validator';

import { Note } from '../note.interface';

export class CreateNoteDto implements Note {
  @IsString()
  Text: string;
}

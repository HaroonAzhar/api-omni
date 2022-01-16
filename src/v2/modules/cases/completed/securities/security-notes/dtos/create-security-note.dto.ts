import { IsString } from 'class-validator';

import { CreateSecurityNote } from '../security-notes.interface';
export class CreateSecurityNoteDto implements Omit<CreateSecurityNote, 'CreatedBy'> {
  @IsString()
  Text: string;
}

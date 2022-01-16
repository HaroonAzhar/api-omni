import { IsString, MinLength } from 'class-validator';

import { CLIENT_NAME_LENGTH } from '../case-reference/generate-case-reference';

export class CreateCaseReferenceDto {
  @IsString()
  @MinLength(CLIENT_NAME_LENGTH)
  readonly clientName: string;
}

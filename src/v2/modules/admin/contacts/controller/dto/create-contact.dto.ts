import { IsString, IsOptional, IsISO8601 } from 'class-validator';

import { CreateContact } from '../../contact.interface';

export class CreateContactDto implements CreateContact {
  @IsString()
  Forename: string;

  @IsString()
  Surname: string;

  @IsString()
  @IsOptional()
  MiddleName?: string;

  @IsString()
  @IsOptional()
  NationalInsuranceNumber?: string;

  @IsISO8601({ strict: false })
  @IsOptional()
  DateOfBirth?: string;
}

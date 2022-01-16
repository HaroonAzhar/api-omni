import { IsString, IsOptional, IsISO8601 } from 'class-validator';

import { UpdateContact } from '../../contact.interface';

export class UpdateContactDto implements UpdateContact {
  @IsString()
  @IsOptional()
  Forename?: string;

  @IsString()
  @IsOptional()
  Surname?: string;

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

import { IsString, IsIn, IsOptional, IsEmail, MinLength } from 'class-validator';

import { ChangeContactCompanyContent } from '../dip.contact.interface';

export class ChangeContactCompanyDto implements ChangeContactCompanyContent {
  @IsOptional()
  @IsString()
  @IsEmail()
  CompanyEmail: string;

  @IsString()
  @MinLength(4)
  CompanyName: string;

  @IsString()
  CompanyNumber: string;

  @IsString()
  @IsIn(['company'])
  ContactType: 'company';
}

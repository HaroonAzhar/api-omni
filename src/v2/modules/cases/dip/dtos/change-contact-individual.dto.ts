import { Type } from 'class-transformer';
import { IsString, IsIn, IsOptional, IsEmail, IsNumber, ValidateNested, IsArray, ArrayNotEmpty } from 'class-validator';

import { ChangeIndividual, ChangeContactIndividualContent } from '../dip.contact.interface';

class IndividualContactDto implements ChangeIndividual {
  @IsOptional()
  @IsString()
  @IsEmail()
  Email: string;

  @IsNumber()
  @Type(() => Number)
  FkSharedContactId: number;
}
export class ChangeContactIndividualDto implements ChangeContactIndividualContent {
  @ValidateNested()
  @ArrayNotEmpty()
  @IsArray()
  @Type(() => IndividualContactDto)
  contacts: IndividualContactDto[];

  @IsString()
  @IsIn(['individual'])
  ContactType: 'individual';
}

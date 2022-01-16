import { CreatePropertyEntity } from '@v2/modules/cases/application/application.interface';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { CreateNoteDto } from '../../notes/dtos/create-note.dto';
import { CreateSecurityValuationDto } from '../security-valuations/dtos/create-security-valuation.dto';
import { CreateNewSecurity } from '../security.interface';

class CreatePropertyDto implements CreatePropertyEntity {
  @IsString()
  AddressLine1: string;

  @IsOptional()
  @IsString()
  AddressLine2?: string;

  @IsString()
  AddressCity: string;

  @IsString()
  AddressPostcode: string;

  @IsString()
  AddressCountry: string;
}

export class CreateNewSecurityDto implements CreateNewSecurity {
  @Type(() => CreateSecurityValuationDto)
  @ValidateNested()
  valuation: CreateSecurityValuationDto & { CreatedBy: string };

  @ValidateNested()
  @Type(() => CreateNoteDto)
  note: CreateNoteDto & { CreatedBy: string };

  @ValidateNested()
  @Type(() => CreatePropertyDto)
  property: CreatePropertyDto;
}

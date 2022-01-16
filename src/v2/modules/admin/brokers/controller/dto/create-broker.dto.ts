import { ValidateNested, IsString, IsBoolean, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateBroker } from '../../broker.interface';
import { CreateBrokerIndividualDto } from './create-broker-individual.dto';

export class CreateBrokerDto implements CreateBroker {
  @ValidateNested()
  @IsArray()
  @Type(() => CreateBrokerIndividualDto)
  @IsOptional()
  individualBrokers?: CreateBrokerIndividualDto[];

  @IsString()
  CompanyName: string;

  @IsBoolean()
  isApproved: boolean;
}

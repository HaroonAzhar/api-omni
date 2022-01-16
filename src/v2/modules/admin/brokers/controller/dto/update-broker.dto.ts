import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsArray, IsString, IsBoolean } from 'class-validator';

import { UpdateBroker } from '../../broker.interface';
import { UpdateBrokerIndividualDto } from './update-broker-individual.dto';

export class UpdateBrokerDto implements UpdateBroker {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateBrokerIndividualDto)
  @IsArray()
  readonly individualBrokers?: UpdateBrokerIndividualDto[];

  @IsOptional()
  @IsString()
  readonly CompanyName?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  readonly isApproved?: boolean;
}

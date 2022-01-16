import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

import { UpdateBrokerIndividual } from '../../broker.interface';

export class UpdateBrokerIndividualDto implements UpdateBrokerIndividual {
  @IsString()
  @IsOptional()
  readonly ContactName?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  readonly ContactEmail?: string;

  @IsNumber()
  @IsOptional()
  readonly Id?: number;
}

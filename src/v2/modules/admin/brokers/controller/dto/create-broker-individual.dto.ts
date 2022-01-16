import { IsString, IsEmail } from 'class-validator';

import { CreateBrokerIndividual } from '../../broker.interface';

export class CreateBrokerIndividualDto implements CreateBrokerIndividual {
  @IsString()
  readonly ContactName: string;

  @IsString()
  @IsEmail()
  readonly ContactEmail: string;
}

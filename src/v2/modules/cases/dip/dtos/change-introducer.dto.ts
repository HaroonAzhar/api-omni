import { Type } from 'class-transformer';
import { IsNumber, IsString, IsIn, IsOptional, ValidateIf } from 'class-validator';

import { IntroducerType, introducerTypes } from '../../types/introducer-type/introducer-type.interface';
import { ChangeIntroducerCommandContent } from '../dip.interface';

const validateIfBroker = (o: ChangeIntroducerCommandContent) => o.IntroducerType === 'via_broker';
export class ChangeIntroducerDto implements ChangeIntroducerCommandContent {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  FkOriginatorId?: number;

  @IsString()
  @IsIn((introducerTypes as unknown) as string[])
  IntroducerType: IntroducerType;

  @IsNumber()
  @Type(() => Number)
  @ValidateIf(validateIfBroker)
  FkBrokerCompanyId?: number;

  @IsNumber()
  @Type(() => Number)
  @ValidateIf(validateIfBroker)
  FkBrokerIndividualId?: number;
}

import { IsIn, IsOptional, IsString } from 'class-validator';

import {
  CreateOriginationChecklistLandChargesResultEntity,
  Result,
  results,
} from '../origination-checklist-land-charges.interface';

export class AddResultDto implements CreateOriginationChecklistLandChargesResultEntity {
  @IsString()
  Forename: string;

  @IsString()
  Surname: string;

  @IsString()
  @IsOptional()
  MiddleName?: string;

  @IsString()
  @IsIn((results as unknown) as string[])
  Result: Result;
}

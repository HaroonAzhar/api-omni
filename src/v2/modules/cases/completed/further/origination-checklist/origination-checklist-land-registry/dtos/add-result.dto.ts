import { Type } from 'class-transformer';
import { IsBoolean, Equals, IsNumber } from 'class-validator';

import { CreateOriginationChecklistLandRegistryResultEntity } from '../origination-checklist-land-registry.interface';

export class AddResultDto implements CreateOriginationChecklistLandRegistryResultEntity {
  @IsBoolean()
  @Type(() => Boolean)
  @Equals(true)
  LandRegistrySearchRun: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  @Equals(true)
  NoOtherCharges: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  @Equals(true)
  OmniNoted: boolean;

  @IsNumber()
  FkSecurityId: number;
}

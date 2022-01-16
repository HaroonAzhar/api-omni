import { IsString, IsIn } from 'class-validator';

import { BuildingType, buildingTypes } from '../../types/building-type/building-type.interface';
import { ChangeBuildingTypeCommandContent } from '../dip.interface';

export class ChangeBuildingTypeDto implements ChangeBuildingTypeCommandContent {
  @IsString()
  @IsIn((buildingTypes as unknown) as string[])
  BuildingType: BuildingType;
}

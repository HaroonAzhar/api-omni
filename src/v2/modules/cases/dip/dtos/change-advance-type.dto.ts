import { IsString, IsIn } from 'class-validator';

import { AdvanceType, advanceTypes } from '../../types/advance-type/advance-type.interface';
import { ChangeAdvanceTypeCommandContent } from '../dip.interface';

export class ChangeAdvanceTypeDto implements ChangeAdvanceTypeCommandContent {
  @IsString()
  @IsIn((advanceTypes as unknown) as string[])
  AdvanceType: AdvanceType;
}

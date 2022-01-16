import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

import { UpdateUnderwriterFlowEntity } from '../underwriter-flow.interface';

export class ChangeWriteUpDateDto implements UpdateUnderwriterFlowEntity {
  @Type(() => Date)
  @IsDate()
  WriteUpDate: Date;
}

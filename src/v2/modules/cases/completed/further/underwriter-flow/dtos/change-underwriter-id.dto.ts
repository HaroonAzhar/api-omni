import { IsInt } from 'class-validator';

import { UpdateUnderwriterFlowEntity } from '../underwriter-flow.interface';

export class ChangeUnderwriterIdDto implements UpdateUnderwriterFlowEntity {
  @IsInt()
  FkUnderwriterId: number;
}

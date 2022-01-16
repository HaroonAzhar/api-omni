import { IsString } from 'class-validator';

import { UpdateUnderwriterFlowEntity } from '../underwriter-flow.interface';

export class ChangeRisksConcernsDto implements UpdateUnderwriterFlowEntity {
  @IsString()
  RisksConcerns: string;
}

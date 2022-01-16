import { IsString } from 'class-validator';

import { UpdateUnderwriterFlowEntity } from '../underwriter-flow.interface';

export class ChangeAssessmentOfProgressDto implements UpdateUnderwriterFlowEntity {
  @IsString()
  AssessmentOfProgress: string;
}

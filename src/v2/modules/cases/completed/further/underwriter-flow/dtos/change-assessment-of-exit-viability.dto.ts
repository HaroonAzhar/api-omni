import { IsString } from 'class-validator';

import { UpdateUnderwriterFlowEntity } from '../underwriter-flow.interface';

export class ChangeAssessmentOfExitViabilityDto implements UpdateUnderwriterFlowEntity {
  @IsString()
  AssessmentOfExitViability: string;
}

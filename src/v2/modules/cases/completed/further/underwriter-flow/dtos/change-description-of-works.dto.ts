import { IsString } from 'class-validator';

import { UpdateUnderwriterFlowEntity } from '../underwriter-flow.interface';

export class ChangeDescriptionOfWorksDto implements UpdateUnderwriterFlowEntity {
  @IsString()
  DescriptionOfWorks: string;
}

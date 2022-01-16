import { IsISO8601, IsIn, IsString, ValidateIf, IsOptional } from 'class-validator';

import { Stage, stages } from '../case.interface';
import { CreateCompletedParams } from '../completed/completed.interface';

class ChangeStageToCompletedDto implements CreateCompletedParams {
  @ValidateIf((o) => o.Stage === 'completed')
  @IsISO8601({ strict: false })
  readonly DateOfCompletion: string;

  @ValidateIf((o) => o.Stage === 'completed')
  @IsOptional()
  readonly AddWaypointForRedemptionDueDate: boolean;

  @ValidateIf((o) => o.Stage === 'completed')
  @IsOptional()
  @IsISO8601({ strict: false })
  readonly AddWaypointForRedemptionDueDateDate: string;

  @ValidateIf((o) => o.Stage === 'completed')
  @IsOptional()
  readonly AddWaypointForSendStandingOrderInstruction: boolean;

  @ValidateIf((o) => o.Stage === 'completed')
  @IsOptional()
  @IsISO8601({ strict: false })
  readonly AddWaypointForSendStandingOrderInstructionDate: string;

  @ValidateIf((o) => o.Stage === 'completed')
  @IsOptional()
  readonly AddWaypointForServicedInterestPaymentDue: boolean;

  @ValidateIf((o) => o.Stage === 'completed')
  @IsOptional()
  @IsISO8601({ strict: false })
  readonly AddWaypointForServicedInterestPaymentDueDate: string;

  @ValidateIf((o) => o.Stage === 'completed')
  @IsOptional()
  readonly AddWaypointForReviewExitStrategy: boolean;

  @ValidateIf((o) => o.Stage === 'completed')
  @IsOptional()
  @IsISO8601({ strict: false })
  readonly AddWaypointForReviewExitStrategyDate: string;
}

export class ChangeStageDto extends ChangeStageToCompletedDto {
  @IsString()
  @IsIn((stages as unknown) as string[])
  readonly Stage: Stage;
}

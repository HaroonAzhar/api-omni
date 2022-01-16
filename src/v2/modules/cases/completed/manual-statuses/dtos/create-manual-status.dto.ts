import { IsIn, IsISO8601, IsString } from 'class-validator';

import { ManualStatus, manualCompletedStatuses, ManualCompletedStatus } from '../manual-status.interface';

export class CreateManualStatusDto implements ManualStatus {
  @IsString()
  @IsIn((manualCompletedStatuses as unknown) as string[])
  Status: ManualCompletedStatus;

  @IsISO8601({ strict: false })
  EffectiveFrom: string;
}

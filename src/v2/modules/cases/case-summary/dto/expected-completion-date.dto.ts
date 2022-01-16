import { IsISO8601 } from 'class-validator';

import { UpdateCaseSummary } from './../case-summary.interface';

export class ExpectedCompletionDateDto implements UpdateCaseSummary {
  @IsISO8601({ strict: false })
  ExpectedCompletionDate: string;
}

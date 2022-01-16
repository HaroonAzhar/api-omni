import { Body, Controller, Param, Post } from '@nestjs/common';

import { CaseSummaryService } from './case-summary.service';
import { ExpectedCompletionDateDto } from './dto/expected-completion-date.dto';

@Controller('cases/:caseUuid/caseSummary')
export class CaseSummaryController {
  constructor(private readonly caseSummaryService: CaseSummaryService) {}

  @Post('/expectedCompletionDate')
  async addTagToCase(@Param('caseUuid') caseUuid: string, @Body() params: ExpectedCompletionDateDto): Promise<void> {
    const { ExpectedCompletionDate } = params;
    return this.caseSummaryService.updateExpectedCompletionDate(caseUuid, ExpectedCompletionDate);
  }
}

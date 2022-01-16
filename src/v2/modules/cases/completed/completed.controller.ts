import { Controller, Get, Param } from '@nestjs/common';

import { CompletedService } from './completed.service';

@Controller('cases/:caseUuid/completed')
export class CompletedController {
  constructor(private readonly completedService: CompletedService) {}

  @Get()
  getCompleted(@Param('caseUuid') caseUuid: string) {
    return this.completedService.getByCaseUuid(caseUuid);
  }
}

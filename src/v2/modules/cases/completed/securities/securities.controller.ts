import { Controller, Get, Param, Post, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { contextFromRequest } from '@v2/utils/commands';

import { Security } from './security.interface';
import { SecuritiesService } from './securities.service';
import { CreateNewSecurityDto } from './dtos/create-new-security.dto';

@Controller('cases/:caseUuid/completed/securities')
export class SecuritiesController {
  constructor(private readonly securitiesService: SecuritiesService) {}

  @Get()
  getSecurities(@Param('caseUuid') caseUuid: string): Promise<Security[]> {
    return this.securitiesService.getSecurities(caseUuid);
  }

  @Post()
  createSecurity(
    @Param('caseUuid') caseUuid: string,
    @Body() params: CreateNewSecurityDto,
    @Req() req: Request
  ): Promise<number> {
    return this.securitiesService.createNewSecurity(
      caseUuid,
      {
        ...params,
        valuation: { ...params.valuation, CreatedBy: req.user },
        note: { ...params.note, CreatedBy: req.user },
      },
      contextFromRequest(req)
    );
  }
}

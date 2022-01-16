import { Controller, Post, Body, Req, Param } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { CreateSecurityValuationDto } from './dtos/create-security-valuation.dto';
import { SecurityValuationsService } from './security-valuations.service';

@Controller('cases/:caseUuid/completed/securities/:securityId/valuations')
export class SecurityValuationsController {
  constructor(private readonly securitiesValuationsService: SecurityValuationsService) {}

  @Post()
  addSecurityValuation(
    @Param('securityId') securityId: number,
    @Body() params: CreateSecurityValuationDto,
    @Req() req: Request
  ): Promise<number> {
    return this.securitiesValuationsService.createSecurityValuation(
      securityId,
      { ...params, CreatedBy: req.user },
      contextFromRequest(req)
    );
  }
}

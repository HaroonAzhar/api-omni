import { Controller, Post, Body, Req, Param } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { CreateSecurityConversionDto } from './dtos/create-security-conversion.dto';
import { SecurityConversionsService } from './security-conversions.service';

@Controller('cases/:caseUuid/completed/securities/:securityId/conversions')
export class SecurityConversionsController {
  constructor(private readonly securitiesConversionsService: SecurityConversionsService) {}

  @Post()
  addSecurityConversion(
    @Param('securityId') securityId: number,
    @Body() params: CreateSecurityConversionDto,
    @Req() req: Request
  ): Promise<number> {
    return this.securitiesConversionsService.createSecurityConversion(
      securityId,
      { ...params, CreatedBy: req.user },
      contextFromRequest(req)
    );
  }
}

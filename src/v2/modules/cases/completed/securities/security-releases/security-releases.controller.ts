import { Controller, Post, Body, Req, Param } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { CreateSecurityReleaseDto } from './dtos/create-security-release.dto';
import { SecurityReleasesService } from './security-releases.service';

@Controller('cases/:caseUuid/completed/securities/:securityId/releases')
export class SecurityReleasesController {
  constructor(private readonly securitiesReleasesService: SecurityReleasesService) {}

  @Post()
  addSecurityRelease(
    @Param('securityId') securityId: number,
    @Body() params: CreateSecurityReleaseDto,
    @Req() req: Request
  ): Promise<number> {
    return this.securitiesReleasesService.createSecurityRelease(
      securityId,
      { ...params, CreatedBy: req.user },
      contextFromRequest(req)
    );
  }
}

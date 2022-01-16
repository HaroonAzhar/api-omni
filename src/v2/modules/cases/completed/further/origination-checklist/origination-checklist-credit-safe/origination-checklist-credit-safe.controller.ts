import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { SignatureDto } from '../../signature/signature.dto';
import { MarkNameMatchesDto } from './dtos/mark-name-matches.dto';
import { MarkDirectorsSameDto } from './dtos/mark-directors-same.dto';
import { MarkNoCCJDto } from './dtos/mark-no-ccj.dto';
import { OriginationChecklistCreditSafeService } from './origination-checklist-credit-safe.service';

@Controller('/cases/:caseUuid/completed/:further/:furtherId/originationChecklist/creditSafe')
export class OriginationChecklistCreditSafeController {
  constructor(private readonly creditSafeService: OriginationChecklistCreditSafeService) {}

  @Post('/primarySignature')
  addPrimarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.creditSafeService.addPrimarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/secondarySignature')
  addSecondarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.creditSafeService.addSecondarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/nameMatchesOfferLetter')
  markNameMatches(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: MarkNameMatchesDto,
    @Req() req: Request
  ): Promise<void> {
    return this.creditSafeService.markNameMatches(
      furtherId,
      further,
      params.NameMatchesOfferLetter,
      contextFromRequest(req)
    );
  }

  @Post('/ensureNoCCJ')
  markNoCCJ(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: MarkNoCCJDto,
    @Req() req: Request
  ): Promise<void> {
    return this.creditSafeService.markNoCCJ(furtherId, further, params.EnsureNoCCJ, contextFromRequest(req));
  }

  @Post('/directorsListedTheSame')
  markDirectorsSame(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: MarkDirectorsSameDto,
    @Req() req: Request
  ): Promise<void> {
    return this.creditSafeService.markDirectorsSame(
      furtherId,
      further,
      params.DirectorsListedTheSame,
      contextFromRequest(req)
    );
  }
}

import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { SignatureDto } from '../../signature/signature.dto';
import { OriginationChecklistExperianService } from './origination-checklist-experian.service';

@Controller('/cases/:caseUuid/completed/:further/:furtherId/originationChecklist/experian')
export class OriginationChecklistExperianController {
  constructor(private readonly experianService: OriginationChecklistExperianService) {}

  @Post('/primarySignature')
  addPrimarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.experianService.addPrimarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/secondarySignature')
  addSecondarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.experianService.addSecondarySignature(furtherId, further, params, contextFromRequest(req));
  }
}

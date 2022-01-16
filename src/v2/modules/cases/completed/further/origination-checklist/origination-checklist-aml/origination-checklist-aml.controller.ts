import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { SignatureDto } from '../../signature/signature.dto';
import { OriginationChecklistAmlService } from './origination-checklist-aml.service';

@Controller('/cases/:caseUuid/completed/:further/:furtherId/originationChecklist/aml')
export class OriginationChecklistAmlController {
  constructor(private readonly amlService: OriginationChecklistAmlService) {}

  @Post('/primarySignature')
  addPrimarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.amlService.addPrimarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/secondarySignature')
  addSecondarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.amlService.addSecondarySignature(furtherId, further, params, contextFromRequest(req));
  }
}

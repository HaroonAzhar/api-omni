import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { SignatureDto } from '../../signature/signature.dto';
import { OriginationChecklistInsuranceService } from './origination-checklist-insurance.service';

@Controller('/cases/:caseUuid/completed/:further/:furtherId/originationChecklist/insurance')
export class OriginationChecklistInsuranceController {
  constructor(private readonly insuranceService: OriginationChecklistInsuranceService) {}

  @Post('/primarySignature')
  addPrimarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.insuranceService.addPrimarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/secondarySignature')
  addSecondarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.insuranceService.addSecondarySignature(furtherId, further, params, contextFromRequest(req));
  }
}
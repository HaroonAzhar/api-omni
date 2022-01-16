import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { SignatureDto } from '../../signature/signature.dto';
import { MarkCheckFacilityLetterDto } from './dtos/mark-check-facility-letter.dto';
import { AddResultDto } from './dtos/add-result.dto';
import { OriginationChecklistLandChargesService } from './origination-checklist-land-charges.service';

@Controller('/cases/:caseUuid/completed/:further/:furtherId/originationChecklist/landCharges')
export class OriginationChecklistLandChargesController {
  constructor(private readonly landChargesService: OriginationChecklistLandChargesService) {}

  @Post('/primarySignature')
  addPrimarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.landChargesService.addPrimarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/secondarySignature')
  addSecondarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.landChargesService.addSecondarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/checkFacilityLetter')
  markCheckFacilityLetter(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: MarkCheckFacilityLetterDto,
    @Req() req: Request
  ): Promise<void> {
    return this.landChargesService.markCheckFacilityLetter(
      furtherId,
      further,
      params.CheckFacilityLetter,
      contextFromRequest(req)
    );
  }

  @Post('/results')
  addResult(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: AddResultDto,
    @Req() req: Request
  ): Promise<void> {
    return this.landChargesService.addResult(furtherId, further, params, contextFromRequest(req));
  }

  @Patch('/results/:landChargeResultId')
  updateResult(
    @Param('landChargeResultId') landChargeResultId: number,
    @Body() params: AddResultDto,
    @Req() req: Request
  ): Promise<void> {
    return this.landChargesService.updateResult(landChargeResultId, params, contextFromRequest(req));
  }
}

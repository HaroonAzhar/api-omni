import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { SignatureDto } from '../../signature/signature.dto';
import { SaveSignatoriesOriginationChecklistDrawDownRequestDto } from './dtos/save-signatories-origination-checklist-draw-down-request.dto';
import { MarkAmountsEnteredMatchesAmountOriginationChecklistDrawDownRequestDto } from './dtos/mark-amount-entered-matches-amount-origination-checklist-draw-down-request.dto';
import { OriginationChecklistDrawDownRequestService } from './origination-checklist-draw-down-request.service';

@Controller('/cases/:caseUuid/completed/:further/:furtherId/originationChecklist/drawDownRequest')
export class OriginationChecklistDrawDownRequestController {
  constructor(private readonly drawDownRequestService: OriginationChecklistDrawDownRequestService) {}

  @Post('/primarySignature')
  addPrimarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.drawDownRequestService.addPrimarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/secondarySignature')
  addSecondarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.drawDownRequestService.addSecondarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/signatories')
  saveSignatories(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SaveSignatoriesOriginationChecklistDrawDownRequestDto,
    @Req() req: Request
  ): Promise<void> {
    return this.drawDownRequestService.saveSignatories(furtherId, further, params.Signatories, contextFromRequest(req));
  }

  @Post('/amountEnteredMatchesAmount')
  markAmountsEnteredMatchesAmount(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: MarkAmountsEnteredMatchesAmountOriginationChecklistDrawDownRequestDto,
    @Req() req: Request
  ): Promise<void> {
    return this.drawDownRequestService.markAmountsEnteredMatchesAmount(
      furtherId,
      further,
      params.AmountEnteredMatchesAmount,
      contextFromRequest(req)
    );
  }
}

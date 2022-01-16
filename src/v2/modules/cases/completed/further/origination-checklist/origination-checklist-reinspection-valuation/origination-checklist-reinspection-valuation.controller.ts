import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { SignatureDto } from '../../signature/signature.dto';
import { MarkAddressedToCorrectDto } from './dtos/mark-addressed-to-correct.dto';
import { MarkAddressMatchesDto } from './dtos/mark-address-matches.dto';
import { MarkValuerOnApprovedDto } from './dtos/mark-valuer-on-approved.dto';
import { OriginationChecklistReinspectionValuationService } from './origination-checklist-reinspection-valuation.service';
import { MarkSignedAndDatedDto } from './dtos/mark-signed-and-dated.dto';
import { MarkWithin3MonthsDto } from './dtos/mark-within-3-months.dto';

@Controller('/cases/:caseUuid/completed/:further/:furtherId/originationChecklist/reinspectionValuation')
export class OriginationChecklistReinspectionValuationController {
  constructor(private readonly reinspectionValuationService: OriginationChecklistReinspectionValuationService) {}

  @Post('/primarySignature')
  addPrimarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.reinspectionValuationService.addPrimarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/secondarySignature')
  addSecondarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.reinspectionValuationService.addSecondarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/addressMatches')
  markAddressMatches(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: MarkAddressMatchesDto,
    @Req() req: Request
  ): Promise<void> {
    return this.reinspectionValuationService.markAddressMatches(
      furtherId,
      further,
      params.AddressMatches,
      contextFromRequest(req)
    );
  }

  @Post('/addressedToCorrect')
  markAddressedToCorrect(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: MarkAddressedToCorrectDto,
    @Req() req: Request
  ): Promise<void> {
    return this.reinspectionValuationService.markAddressedToCorrect(
      furtherId,
      further,
      params.AddressedToCorrect,
      contextFromRequest(req)
    );
  }

  @Post('/signedAndDated')
  markSignedAndDated(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: MarkSignedAndDatedDto,
    @Req() req: Request
  ): Promise<void> {
    return this.reinspectionValuationService.markSignedAndDated(
      furtherId,
      further,
      params.SignedAndDated,
      contextFromRequest(req)
    );
  }

  @Post('/valuerOnApproved')
  markValuerOnApproved(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: MarkValuerOnApprovedDto,
    @Req() req: Request
  ): Promise<void> {
    return this.reinspectionValuationService.markValuerOnApproved(
      furtherId,
      further,
      params.ValuerOnApproved,
      contextFromRequest(req)
    );
  }

  @Post('/within3Months')
  markWithin3Months(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: MarkWithin3MonthsDto,
    @Req() req: Request
  ): Promise<void> {
    return this.reinspectionValuationService.markWithin3Months(
      furtherId,
      further,
      params.Within3Months,
      contextFromRequest(req)
    );
  }
}

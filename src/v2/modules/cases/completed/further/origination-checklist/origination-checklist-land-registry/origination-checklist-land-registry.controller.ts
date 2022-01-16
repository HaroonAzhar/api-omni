import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { SignatureDto } from '../../signature/signature.dto';
import { AddResultDto } from './dtos/add-result.dto';
import { OriginationChecklistLandRegistryService } from './origination-checklist-land-registry.service';

@Controller('/cases/:caseUuid/completed/:further/:furtherId/originationChecklist/landRegistry')
export class OriginationChecklistLandRegistryController {
  constructor(private readonly landRegistryService: OriginationChecklistLandRegistryService) {}

  @Post('/primarySignature')
  addPrimarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.landRegistryService.addPrimarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/secondarySignature')
  addSecondarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.landRegistryService.addSecondarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/results')
  addResult(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: AddResultDto,
    @Req() req: Request
  ): Promise<void> {
    return this.landRegistryService.addResult(furtherId, further, params, contextFromRequest(req));
  }
}

import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { SignatureDto } from '../../signature/signature.dto';
import { OriginationChecklistDocumentsService } from './origination-checklist-documents.service';

@Controller('/cases/:caseUuid/completed/:further/:furtherId/originationChecklist/documents')
export class OriginationChecklistDocumentsController {
  constructor(private readonly documentsService: OriginationChecklistDocumentsService) {}

  @Post('/primarySignature')
  addPrimarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.documentsService.addPrimarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/secondarySignature')
  addSecondarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.documentsService.addSecondarySignature(furtherId, further, params, contextFromRequest(req));
  }
}

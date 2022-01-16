import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { SignatureDto } from '../../signature/signature.dto';
import { EditOriginationChecklistSolicitorDto } from './dtos/edit-origination-checklist-solicitor-solicitor-comments.dto';
import { OriginationChecklistSolicitorService } from './origination-checklist-solicitor.service';

@Controller('/cases/:caseUuid/completed/:further/:furtherId/originationChecklist/solicitor')
export class OriginationChecklistSolicitorController {
  constructor(private readonly solicitorService: OriginationChecklistSolicitorService) {}

  @Post('/primarySignature')
  addPrimarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.solicitorService.addPrimarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/secondarySignature')
  addSecondarySignature(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.solicitorService.addSecondarySignature(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/comments')
  editComments(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: EditOriginationChecklistSolicitorDto,
    @Req() req: Request
  ): Promise<void> {
    return this.solicitorService.editComments(furtherId, further, params.Comments, contextFromRequest(req));
  }
}

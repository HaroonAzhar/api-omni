import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { SignatureDto, SignatureWithCommentDto } from '../signature/signature.dto';
import { OriginationChecklistService } from './origination-checklist.service';

@Controller('/cases/:caseUuid/completed/:further/:furtherId/originationChecklist')
export class OriginationChecklistController {
  constructor(private readonly service: OriginationChecklistService) {}

  @Post('/initialCheck')
  initialCheck(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,

    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.service.initialCheck(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/finalSignOf')
  finalSignOf(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.service.finalSignOf(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/close')
  close(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,

    @Body() params: SignatureWithCommentDto,
    @Req() req: Request
  ): Promise<void> {
    return this.service.close(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/submitToUnderwriter')
  submitToUnderwriter(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,

    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.service.submitToUnderwriter(furtherId, further, params, contextFromRequest(req));
  }
}

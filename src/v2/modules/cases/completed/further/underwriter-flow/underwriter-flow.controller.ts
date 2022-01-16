import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { SignatureDto, SignatureWithCommentDto } from '../signature/signature.dto';
import { ChangeDescriptionOfWorksDto } from './dtos/change-description-of-works.dto';
import { ChangeUnderwriterIdDto } from './dtos/change-underwriter-id.dto';
import { ChangeWriteUpDateDto } from './dtos/change-write-up-date.dto';
import { ChangeAssessmentOfProgressDto } from './dtos/change-assessment-of-progress.dto';
import { UnderwriterFlowService } from './underwriter-flow.service';
import { ChangeRisksConcernsDto } from './dtos/change-risks-concerns.dto';
import { ChangeAssessmentOfExitViabilityDto } from './dtos/change-assessment-of-exit-viability.dto';

@Controller('/cases/:caseUuid/completed/:further/:furtherId/underwriterFlow')
export class UnderwriterFlowController {
  constructor(private readonly service: UnderwriterFlowService) {}

  @Post('/approve')
  approve(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureDto,
    @Req() req: Request
  ): Promise<void> {
    return this.service.approveUnderwriterFlow(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/return')
  return(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: SignatureWithCommentDto,
    @Req() req: Request
  ): Promise<void> {
    return this.service.returnUnderwriterFlow(furtherId, further, params, contextFromRequest(req));
  }

  @Post('/writeUpDate')
  changeWriteUpDate(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: ChangeWriteUpDateDto,
    @Req() req: Request
  ): Promise<void> {
    return this.service.changeUnderwriterFlow(
      furtherId,
      further,
      'WriteUpDate',
      params.WriteUpDate,
      contextFromRequest(req)
    );
  }

  @Post('/fkUnderwriterId')
  changeFkUnderwriterId(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: ChangeUnderwriterIdDto,
    @Req() req: Request
  ): Promise<void> {
    return this.service.changeUnderwriterFlow(
      furtherId,
      further,
      'FkUnderwriterId',
      params.FkUnderwriterId,
      contextFromRequest(req)
    );
  }

  @Post('/assessmentOfExitViability')
  changeAssessmentOfExitViability(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: ChangeAssessmentOfExitViabilityDto,
    @Req() req: Request
  ): Promise<void> {
    return this.service.changeUnderwriterFlow(
      furtherId,
      further,
      'AssessmentOfExitViability',
      params.AssessmentOfExitViability,
      contextFromRequest(req)
    );
  }

  @Post('/descriptionOfWorks')
  changeDescriptionOfWorks(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: ChangeDescriptionOfWorksDto,
    @Req() req: Request
  ): Promise<void> {
    return this.service.changeUnderwriterFlow(
      furtherId,
      further,
      'DescriptionOfWorks',
      params.DescriptionOfWorks,
      contextFromRequest(req)
    );
  }

  @Post('/assessmentOfProgress')
  changeAssessmentOfProgress(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: ChangeAssessmentOfProgressDto,
    @Req() req: Request
  ): Promise<void> {
    return this.service.changeUnderwriterFlow(
      furtherId,
      further,
      'AssessmentOfProgress',
      params.AssessmentOfProgress,
      contextFromRequest(req)
    );
  }

  @Post('/risksConcerns')
  changeRisksConcerns(
    @Param('furtherId') furtherId: number,
    @Param('further') further: string,
    @Body() params: ChangeRisksConcernsDto,
    @Req() req: Request
  ): Promise<void> {
    return this.service.changeUnderwriterFlow(
      furtherId,
      further,
      'RisksConcerns',
      params.RisksConcerns,
      contextFromRequest(req)
    );
  }
}

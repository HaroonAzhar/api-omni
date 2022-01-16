import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { AdjustmentCorrectionsService } from './adjustment-corrections.service';
import { CreateAdjustmentCorrectionDto } from './dtos/createAdjustmentCorrection.dto';

@Controller('cases/:caseUuid/completed/adjustments/:adjustmentId/corrections')
export class AdjustmentCorrectionsController {
  constructor(private readonly provisionsService: AdjustmentCorrectionsService) {}

  @Post()
  addAdjustmentCorrection(
    @Param('adjustmentId') adjustmentId: number,
    @Body() params: CreateAdjustmentCorrectionDto,
    @Req() req: Request
  ): Promise<number> {
    return this.provisionsService.createAdjustmentCorrection(
      adjustmentId,
      { ...params, CreatedBy: req.user },
      contextFromRequest(req)
    );
  }
}

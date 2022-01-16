import { Body, Controller, Get, Param, Post, Query, Delete, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { Adjustment } from './adjustment.interface';
import { AdjustmentsService } from './adjustments.service';
import { CreateAdjustmentDto } from './dtos/createAdjustment.dto';
import { GetAdjustmentsFilter } from './dtos/getAdjustments.filter';

@Controller('cases/:caseUuid/completed/adjustments')
export class AdjustmentsController {
  constructor(private readonly adjustmentsService: AdjustmentsService) {}

  @Post()
  addAdjustment(
    @Param('caseUuid') caseUuid: string,
    @Body() params: CreateAdjustmentDto,
    @Req() req: Request
  ): Promise<number> {
    return this.adjustmentsService.createAdjustment(caseUuid, params, contextFromRequest(req));
  }

  @Get()
  getAdjustments(@Param('caseUuid') caseUuid: string, @Query() query: GetAdjustmentsFilter): Promise<Adjustment[]> {
    return this.adjustmentsService.getAdjustments(caseUuid, query);
  }

  @Delete('/:adjustmentId')
  cancelAdjustment(@Param('adjustmentId') adjustmentId: number, @Req() req: Request): Promise<void> {
    return this.adjustmentsService.cancelAdjustment(adjustmentId, contextFromRequest(req));
  }
}

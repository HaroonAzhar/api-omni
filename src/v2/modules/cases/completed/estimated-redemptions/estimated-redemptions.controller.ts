import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { EstimatedRedemptionsService } from './estimated-redemptions.service';
import { CreateEstimatedRedemptionDto } from './dtos/create-estimated-redemption.dto';
import { EstimatedRedemption } from './estimated-redemption.interface';
import { UpdateEstimatedRedemptionDto } from './dtos/update-estimated-redemption.dto';

@Controller('cases/:caseUuid/completed/estimatedRedemptions')
export class EstimatedRedemptionsController {
  constructor(private readonly estimatedRedemptionsService: EstimatedRedemptionsService) {}

  @Post()
  addEstimatedRedemption(
    @Param('caseUuid') caseUuid: string,
    @Body() params: CreateEstimatedRedemptionDto,
    @Req() req: Request
  ): Promise<number> {
    return this.estimatedRedemptionsService.createEstimatedRedemption(
      caseUuid,
      { ...params, CreatedBy: req.user },
      contextFromRequest(req)
    );
  }

  @Patch('/:estimatedRedemptionId')
  changeEstimatedRedemption(
    @Param('caseUuid') caseUuid: string,
    @Body() params: UpdateEstimatedRedemptionDto,
    @Req() req: Request,
    @Param('estimatedRedemptionId') estimatedRedemptionId: number
  ): Promise<void> {
    return this.estimatedRedemptionsService.updateEstimatedRedemption(
      caseUuid,
      { ...params, CreatedBy: req.user },
      estimatedRedemptionId,
      contextFromRequest(req)
    );
  }

  @Delete('/:estimatedRedemptionId')
  deleteEstimatedRedemption(
    @Param('caseUuid') caseUuid: string,
    @Req() req: Request,
    @Param('estimatedRedemptionId') estimatedRedemptionId: number
  ): Promise<void> {
    return this.estimatedRedemptionsService.deleteEstimatedRedemption(
      caseUuid,
      estimatedRedemptionId,
      contextFromRequest(req)
    );
  }

  @Get()
  getEstimatedRedemptions(@Param('caseUuid') caseUuid: string): Promise<EstimatedRedemption[]> {
    return this.estimatedRedemptionsService.getEstimatedRedemptions(caseUuid);
  }
}

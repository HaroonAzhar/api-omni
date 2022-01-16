import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req, Delete } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { ManualStatusesService } from './manual-statuses.service';
import { CreateManualStatusDto } from './dtos/create-manual-status.dto';

@Controller('cases/:caseUuid/completed/manualStatuses')
export class ManualStatusesController {
  constructor(private readonly manualStatusesService: ManualStatusesService) {}

  @Post()
  async addManualStatus(
    @Param('caseUuid') caseUuid: string,
    @Body() manualStatus: CreateManualStatusDto,
    @Req() req: Request
  ) {
    const result = await this.manualStatusesService.createManualStatus(
      caseUuid,
      { ...manualStatus },
      contextFromRequest(req)
    );
    if (result instanceof Error) {
      throw new BadRequestException(result.message, result.name);
    }
    return result;
  }

  @Get()
  getManualStatuses(@Param('caseUuid') caseUuid: string) {
    return this.manualStatusesService.getManualStatuses(caseUuid);
  }

  @Get('/historical')
  getManualStatusesHistorical(@Param('caseUuid') caseUuid: string, @Query() query: { timestamp: string }) {
    return this.manualStatusesService.getManualStatusesHistorical(caseUuid, query.timestamp);
  }

  @Delete('/:manualStatusId')
  deleteDefaultEvent(
    @Param('caseUuid') caseUuid: string,
    @Param('manualStatusId') manualStatusId: number,
    @Req() req: Request
  ) {
    return this.manualStatusesService.deleteManualStatus(caseUuid, manualStatusId, contextFromRequest(req));
  }
}

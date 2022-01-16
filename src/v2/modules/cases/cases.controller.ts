import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { contextFromRequest } from '@v2/utils/commands';

import { CasesService } from './cases.service';
import { ChangeStageDto } from './dtos/changeStage.dto';
import { AssignUserToCaseDto } from './dtos/assignUserToCase.dto';
import { ChangeStatusDto } from './dtos/changeStatus.dto';
import { CreateCaseReferenceDto } from './dtos/createCaseReference.dto';

@Controller('cases')
export class CasesController {
  constructor(private readonly caseService: CasesService) {}

  @Get('/')
  async getAll(@Query('CaseNr') CaseNr?: string) {
    return this.caseService.getAll(CaseNr);
  }

  @Get('/:caseUuid/')
  getOne(@Param('caseUuid') caseUuid: string) {
    return this.caseService.getCaseData(caseUuid);
  }

  @Post('/:caseUuid/status')
  changeStatus(@Param('caseUuid') caseUuid: string, @Body() { Status }: ChangeStatusDto): Promise<void> {
    return this.caseService.changeStatus(caseUuid, Status);
  }

  @Post('/:caseUuid/stage')
  changeStage(@Param('caseUuid') caseUuid: string, @Body() params: ChangeStageDto, @Req() req: Request): Promise<void> {
    return this.caseService.changeStage(caseUuid, params, contextFromRequest(req));
  }
  @Post('/:caseUuid/assignedUser')
  assignCaseToUser(@Param('caseUuid') caseUuid: string, @Body() params: AssignUserToCaseDto) {
    return this.caseService.assignCaseToUser(caseUuid, params);
  }

  @Delete('/:caseUuid/assignedUser')
  removeAssignedUser(@Param('caseUuid') caseUuid: string) {
    return this.caseService.removeAssignedUser(caseUuid);
  }

  @Post('/:caseUuid/caseNr')
  createCaseReference(
    @Param('caseUuid') caseUuid: string,
    @Body() params: CreateCaseReferenceDto
  ): Promise<{ CaseNr: string }> {
    return this.caseService.createCaseReference(caseUuid, params.clientName);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { ExpectedDrawdownsService } from './expected-drawdowns.service';
import { CreateExpectedDrawdownDto } from './dtos/create-expected-drawdown.dto';
import { ExpectedDrawdown } from './expected-drawdown.interface';
import { UpdateExpectedDrawdownDto } from './dtos/update-expected-drawdown.dto';

@Controller('cases/:caseUuid/completed/expectedDrawdowns')
export class ExpectedDrawdownsController {
  constructor(private readonly expectedDrawdownsService: ExpectedDrawdownsService) {}

  @Post()
  addExpectedDrawdown(
    @Param('caseUuid') caseUuid: string,
    @Body() params: CreateExpectedDrawdownDto,
    @Req() req: Request
  ): Promise<number> {
    return this.expectedDrawdownsService.createExpectedDrawdown(
      caseUuid,
      { ...params, CreatedBy: req.user },
      contextFromRequest(req)
    );
  }

  @Patch('/:expectedDrawdownId')
  changeExpectedDrawdown(
    @Param('caseUuid') caseUuid: string,
    @Body() params: UpdateExpectedDrawdownDto,
    @Req() req: Request,
    @Param('expectedDrawdownId') expectedDrawdownId: number
  ): Promise<void> {
    return this.expectedDrawdownsService.updateExpectedDrawdown(
      caseUuid,
      { ...params, CreatedBy: req.user },
      expectedDrawdownId,
      contextFromRequest(req)
    );
  }

  @Delete('/:expectedDrawdownId')
  deleteExpectedDrawdown(
    @Param('caseUuid') caseUuid: string,
    @Req() req: Request,
    @Param('expectedDrawdownId') expectedDrawdownId: number
  ): Promise<void> {
    return this.expectedDrawdownsService.deleteExpectedDrawdown(caseUuid, expectedDrawdownId, contextFromRequest(req));
  }

  @Get()
  getExpectedDrawdowns(@Param('caseUuid') caseUuid: string): Promise<ExpectedDrawdown[]> {
    return this.expectedDrawdownsService.getExpectedDrawdowns(caseUuid);
  }
}

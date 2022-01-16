import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { CashflowsService } from './cashflows.service';
import { CreateCashflowDto } from './dtos/createCashflow.dto';
import { GetCashflowsFilter } from './dtos/getCashflows.filter';
import { Cashflow } from './cashflow.interface';

@Controller('cases/:caseUuid/completed/cashflows')
export class CashflowsController {
  constructor(private readonly cashflowsService: CashflowsService) {}

  @Post()
  addCashflow(
    @Param('caseUuid') caseUuid: string,
    @Body() params: CreateCashflowDto,
    @Req() req: Request
  ): Promise<number> {
    return this.cashflowsService.createCashflow(caseUuid, { ...params, CreatedBy: req.user }, contextFromRequest(req));
  }

  @Get()
  getCashflows(@Param('caseUuid') caseUuid: string, @Query() query: GetCashflowsFilter): Promise<Cashflow[]> {
    return this.cashflowsService.getCashflows(caseUuid, query);
  }
}

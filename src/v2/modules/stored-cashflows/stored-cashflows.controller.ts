import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { contextFromRequest } from '@v2/utils/commands';

import { StoredCashflowsService } from './stored-cashflows.service';
import { StoredCashflow } from './stored-cashflow.interface';
import { CreateStoredCashflowDto } from './dtos/create-stored-cashflow.dto';

@Controller('storedCashflows')
export class StoredCashflowsController {
  constructor(private readonly storedCashflowService: StoredCashflowsService) {}
  @Get()
  async findAll(@Query() filterParams: { dateMin: string; dateMax: string }): Promise<StoredCashflow[]> {
    return this.storedCashflowService.findInRange(filterParams.dateMin, filterParams.dateMax);
  }

  @Post()
  async create(@Body() params: CreateStoredCashflowDto, @Req() req: Request): Promise<number> {
    return this.storedCashflowService.createStoredCashflow(params, contextFromRequest(req));
  }
}

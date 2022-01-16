import { Body, Controller, Get, Post } from '@nestjs/common';
import { createResponseProperties, Pagination, PaginationQuery, PaginationQueryParams } from '@v2/utils/pagination';

import { LtvService } from './ltv.service';
import { CreateLtvDto } from './ltv.interface';

/**
 * This dictionary contains labels for column keys.
 */
const t = {
  Gr: 'Gross LTV',
  Res: 'Residential',
  FC: 'First Charge',
  RB: 'Regular Borrower',
  Com: 'Commercial',
  GrD1: 'Gross LTV Day 1',
  NS: 'Non status',
  SC: 'Second Charge',
  ResDev: 'Residential Development',
};

@Controller('ltv')
export class LtvController {
  constructor(private readonly service: LtvService) {}

  @Get('/fields')
  getFields() {
    return {
      GrResFCRB: [t.Gr, t.Res, t.FC, t.RB],
      GrComFCRB: [t.Gr, t.Com, t.FC, t.RB],
      GrD1ResDevFCRB: [t.GrD1, t.ResDev, t.FC, t.RB],
      GDResDevFCRB: [t.Gr, t.ResDev, t.FC, t.RB],
      GrComFCNS: [t.Gr, t.Res, t.FC, t.NS],
      GrResFCNS: [t.Gr, t.Res, t.FC, t.NS],
      GrComSCRB: [t.Gr, t.Com, t.SC, t.RB],
      GrComSCNS: [t.Gr, t.Com, t.SC, t.NS],
    };
  }

  @Post('/')
  async create(@Body() record: CreateLtvDto) {
    await this.service.create(record);
  }

  @Get('/')
  async getNewest() {
    return await this.service.getNewest();
  }

  @Get('/historical')
  async getHistorical(@PaginationQuery() paginationQueryParams: PaginationQueryParams) {
    const { page, limit } = paginationQueryParams;

    const offset = (page - 1) * limit;

    const count = await this.service.getAllHistoricalCount();
    const pagination = createResponseProperties(offset, limit, count);

    const historical = await this.service.getHistorical(offset, limit);

    return new Pagination(historical, pagination);
  }
}

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { FurtherDrawdownsService } from './further-drawdowns.service';
import { CreateFurtherDrawdownDto } from './dtos/create-further-drawdown.dto';
import { FurtherDrawdown } from './further-drawdown.interface';

@Controller('cases/:caseUuid/completed/furtherDrawdowns')
export class FurtherDrawdownsController {
  constructor(private readonly furtherDrawdownsService: FurtherDrawdownsService) {}

  @Post()
  addFurtherDrawdown(
    @Param('caseUuid') caseUuid: string,
    @Body() params: CreateFurtherDrawdownDto,
    @Req() req: Request
  ): Promise<number> {
    return this.furtherDrawdownsService.createFurtherDrawdown(
      caseUuid,
      { ...params, CreatedBy: req.user },
      contextFromRequest(req)
    );
  }

  @Get()
  getFurtherDrawdowns(@Param('caseUuid') caseUuid: string): Promise<FurtherDrawdown[]> {
    return this.furtherDrawdownsService.getFurtherDrawdowns(caseUuid);
  }
}

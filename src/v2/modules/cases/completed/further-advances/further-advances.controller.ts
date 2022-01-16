import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { FurtherAdvancesService } from './further-advances.service';
import { CreateFurtherAdvanceDto } from './dtos/create-further-advance.dto';
import { FurtherAdvance } from './further-advance.interface';

@Controller('cases/:caseUuid/completed/furtherAdvances')
export class FurtherAdvancesController {
  constructor(private readonly furtherAdvancesService: FurtherAdvancesService) {}

  @Post()
  addFurtherAdvance(
    @Param('caseUuid') caseUuid: string,
    @Body() params: CreateFurtherAdvanceDto,
    @Req() req: Request
  ): Promise<number> {
    return this.furtherAdvancesService.createFurtherAdvance(
      caseUuid,
      { ...params, CreatedBy: req.user },
      contextFromRequest(req)
    );
  }

  @Get()
  getFurtherAdvances(@Param('caseUuid') caseUuid: string): Promise<FurtherAdvance[]> {
    return this.furtherAdvancesService.getFurtherAdvances(caseUuid);
  }
}

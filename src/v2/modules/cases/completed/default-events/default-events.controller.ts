import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { DefaultEventsService } from './default-events.service';
import { CreateDefaultEventDto } from './dtos/create-default-event.dto';
import { GetDefaultEventsFilter } from './dtos/get-default-events.filter';

@Controller('cases/:caseUuid/completed/defaultEvents')
export class DefaultEventsController {
  constructor(private readonly defaultEventsService: DefaultEventsService) {}

  @Post()
  async addDefaultEvent(
    @Param('caseUuid') caseUuid: string,
    @Body() defaultEvent: CreateDefaultEventDto,
    @Req() req: Request
  ) {
    const result = await this.defaultEventsService.createDefaultEvent(
      caseUuid,
      { ...defaultEvent },
      contextFromRequest(req)
    );
    if (result instanceof Error) {
      throw new BadRequestException(result.message, result.name);
    }
    return result;
  }

  @Get()
  getDefaultEvents(@Param('caseUuid') caseUuid: string, @Query() query: GetDefaultEventsFilter) {
    return this.defaultEventsService.getDefaultEvents(caseUuid, query);
  }

  @Get('/historical')
  getDefaultEventsHistorical(@Param('caseUuid') caseUuid: string, @Query() query: { timestamp: string }) {
    return this.defaultEventsService.getDefaultEventsHistorical(caseUuid, query.timestamp);
  }

  @Get('/periods')
  getDefaultEventsPeriods(@Param('caseUuid') caseUuid: string, @Query() query: { timestamp: string }) {
    return this.defaultEventsService.getDefaultEventsPeriods(caseUuid, query.timestamp);
  }

  @Delete('/:defaultEventId')
  deleteDefaultEvent(
    @Param('caseUuid') caseUuid: string,
    @Param('defaultEventId') defaultEventId: number,
    @Req() req: Request
  ) {
    return this.defaultEventsService.deleteDefaultEvent(caseUuid, defaultEventId, contextFromRequest(req));
  }
}

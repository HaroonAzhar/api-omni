import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { contextFromRequest } from '@v2/utils/commands';
import { Request } from 'express';

import { ExtensionsService } from './extensions.service';
import { CreateExtensionDto } from './dtos/create-extension.dto';

@Controller('cases/:caseUuid/completed/extensions')
export class ExtensionsController {
  constructor(private readonly extensionsService: ExtensionsService) {}

  @Post()
  async addExtension(@Param('caseUuid') caseUuid: string, @Body() extension: CreateExtensionDto, @Req() req: Request) {
    const result = await this.extensionsService.createExtension(caseUuid, { ...extension }, contextFromRequest(req));
    if (result instanceof Error) {
      throw new BadRequestException(result.message, result.name);
    }
    return result;
  }

  @Get()
  getExtensions(@Param('caseUuid') caseUuid: string) {
    return this.extensionsService.getExtensions(caseUuid);
  }

  @Get('/historical')
  getExtensionsHistorical(@Param('caseUuid') caseUuid: string, @Query() query: { timestamp: string }) {
    return this.extensionsService.getExtensionsHistorical(caseUuid, query.timestamp);
  }
}

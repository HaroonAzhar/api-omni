import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { AssociatedTagsService } from './associated-tags.service';
import { CreateAssociatedTagDto } from './dto/createAssociatedTag.dto';

@Controller('cases/:caseUuid/associatedTags')
export class AssociatedTagsController {
  constructor(private readonly associatedTagsService: AssociatedTagsService) {}

  @Get('/')
  async getAllTagsForCase(@Param('caseUuid') caseUuid: string) {
    return this.associatedTagsService.getAllTagsForCase(caseUuid);
  }

  @Post('/')
  async addTagToCase(@Param('caseUuid') caseUuid: string, @Body() params: CreateAssociatedTagDto) {
    const { FkTagId } = params;
    return this.associatedTagsService.addTagToCase(caseUuid, FkTagId);
  }

  @Delete('/:tagId')
  async removeAssociatedTag(@Param('caseUuid') caseUuid: string, @Param('tagId') FkTagId: number) {
    return this.associatedTagsService.removeAssociatedTag(caseUuid, FkTagId);
  }
}

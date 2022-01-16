import { Controller, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';

import { BaseAdminController } from '../../baseGeneric/baseAdmin.controller';
import { Tag } from '../tag.interface';
import { TagsService } from '../tags.service';
import { CreateTagDto } from './dto/createTag.dto';
import { UpdateTagDto } from './dto/updateTag.dto';

@Controller('tags')
export class TagsController extends BaseAdminController<Tag, CreateTagDto, UpdateTagDto> {
  constructor(private readonly tagsService: TagsService) {
    super(tagsService);
  }

  @Post()
  async create(@Body() createDto: CreateTagDto) {
    return await this.tagsService.add(createDto);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateTagDto) {
    return await this.tagsService.update(id, updateDto);
  }
}

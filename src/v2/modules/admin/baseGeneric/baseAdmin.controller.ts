import { Get, Post, Body, Param, Delete, Patch, Query, ParseIntPipe } from '@nestjs/common';

import { BaseAdminInterface } from './baseAdmin.interface';

export class BaseAdminController<
  Base extends BaseAdminInterface,
  BaseCreateDto extends Base,
  BaseUpdateDto extends Base
> {
  constructor(private readonly baseService: BaseAdminServiceInterface<Base>) {}

  @Post()
  async create(@Body() createDto: BaseCreateDto) {
    return await this.baseService.add(createDto);
  }

  @Get()
  async findAll(@Query('currentRecordId') currentRecordId: number): Promise<Base[]> {
    return await this.baseService.get(currentRecordId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.baseService.getOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: BaseUpdateDto) {
    return await this.baseService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.baseService.remove(id);
  }
}

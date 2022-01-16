import { Controller, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';

import { BaseAdminController } from '../../baseGeneric/baseAdmin.controller';
import { Solicitor } from '../solicitor.interface';
import { SolicitorsService } from '../solicitors.service';
import { CreateSolicitorDto } from './dto/createSolicitor.dto';
import { UpdateSolicitorDto } from './dto/updateSolicitor.dto';

@Controller('solicitors')
export class SolicitorsController extends BaseAdminController<Solicitor, CreateSolicitorDto, UpdateSolicitorDto> {
  constructor(private readonly solicitorsService: SolicitorsService) {
    super(solicitorsService);
  }

  @Post()
  async create(@Body() createDto: CreateSolicitorDto) {
    return await this.solicitorsService.add(createDto);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateSolicitorDto) {
    return await this.solicitorsService.update(id, updateDto);
  }
}

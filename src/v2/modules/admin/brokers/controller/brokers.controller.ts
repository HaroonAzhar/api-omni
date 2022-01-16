import { Controller, Post, Body, Patch, Param, ParseIntPipe, Get, Query, Delete } from '@nestjs/common';

import { Broker } from '../broker.interface';
import { BrokersService } from '../brokers.service';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';

@Controller('brokers')
export class BrokersController {
  constructor(private readonly brokersService: BrokersService) {}

  @Post()
  async create(@Body() createDto: CreateBrokerDto): Promise<number> {
    return await this.brokersService.add(createDto);
  }

  @Get()
  async findAll(@Query('currentRecordId') currentRecordId: number): Promise<Broker[]> {
    return await this.brokersService.get(currentRecordId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Broker> {
    return await this.brokersService.getOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateBrokerDto): Promise<void> {
    return await this.brokersService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.brokersService.remove(id);
  }
}

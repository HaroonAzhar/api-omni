import { Controller, Post, Body, Patch, Param, ParseIntPipe, Get, Query, Delete } from '@nestjs/common';

import { Contact } from '../contact.interface';
import { ContactsService } from '../contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() createDto: CreateContactDto): Promise<number> {
    return await this.contactsService.add(createDto);
  }

  @Get()
  async findAll(
    @Query('currentRecordId') currentRecordId: number,
    @Query('search') search?: string
  ): Promise<Contact[]> {
    if (search) {
      return this.contactsService.find(search);
    }
    return await this.contactsService.get(currentRecordId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Contact | undefined> {
    return await this.contactsService.getOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateContactDto): Promise<void> {
    return await this.contactsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.contactsService.remove(id);
  }
}

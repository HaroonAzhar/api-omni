import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { NotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { GetNotesFilter } from './dtos/get-notes.filter';

@Controller('cases/:caseUuid/completed/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  addNote(@Param('caseUuid') caseUuid: string, @Body() note: CreateNoteDto, @Req() req: Request) {
    return this.notesService.createNote(caseUuid, { ...note, CreatedBy: req.user });
  }

  @Get()
  getNotes(@Param('caseUuid') caseUuid: string, @Query() query: GetNotesFilter) {
    return this.notesService.getNotes(caseUuid, query);
  }

  @Delete('/:noteId')
  deleteNote(@Param('caseUuid') caseUuid: string, @Param('noteId') noteId: number) {
    return this.notesService.deleteNote(caseUuid, noteId);
  }

  @Patch('/:noteId')
  modifyNote(@Param('caseUuid') caseUuid: string, @Param('noteId') noteId: number, @Body() note: UpdateNoteDto) {
    return this.notesService.updateNote(caseUuid, noteId, note);
  }
}

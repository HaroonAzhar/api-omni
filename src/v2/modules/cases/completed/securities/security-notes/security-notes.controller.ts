import { Controller, Post, Body, Req, Param } from '@nestjs/common';
import { Request } from 'express';

import { CreateSecurityNoteDto } from './dtos/create-security-note.dto';
import { SecurityNotesService } from './security-notes.service';

@Controller('cases/:caseUuid/completed/securities/:securityId/notes')
export class SecurityNotesController {
  constructor(private readonly securitiesNotesService: SecurityNotesService) {}

  @Post()
  addSecurityNote(
    @Param('securityId') securityId: number,
    @Body() params: CreateSecurityNoteDto,
    @Req() req: Request
  ): Promise<number> {
    return this.securitiesNotesService.createSecurityNote(securityId, { ...params, CreatedBy: req.user });
  }
}

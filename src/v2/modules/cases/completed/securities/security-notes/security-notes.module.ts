import { Module } from '@nestjs/common';

import { SecurityNotesController } from './security-notes.controller';
import { SecurityNotesRepository } from './security-notes.repository';
import { SecurityNotesService, SecurityNotesRepositoryInterface } from './security-notes.service';

@Module({
  controllers: [SecurityNotesController],
  providers: [SecurityNotesService, { provide: SecurityNotesRepositoryInterface, useClass: SecurityNotesRepository }],
  exports: [SecurityNotesService],
})
export class SecurityNotesModule {}

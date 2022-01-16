import { forwardRef, Module } from '@nestjs/common';

import { CompletedModule } from '../completed.module';
import { NotesController } from './notes.controller';
import { NotesRepository } from './notes.repository';
import { NotesService, NotesRepositoryInterface } from './notes.service';

@Module({
  controllers: [NotesController],
  providers: [NotesService, { provide: NotesRepositoryInterface, useClass: NotesRepository }],
  exports: [NotesService],
  imports: [forwardRef(() => CompletedModule)],
})
export class NotesModule {}

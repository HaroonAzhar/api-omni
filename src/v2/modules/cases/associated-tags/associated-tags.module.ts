import { forwardRef, Module } from '@nestjs/common';

import { TagsModule } from './../../admin/tags/tags.module';
import { AssociatedTagsController } from './associated-tags.controller';
import { AssociatedTagsRepository } from './associated-tags.repository';
import { AssociatedTagsService, AssociatedTagsRepositoryInterface } from './associated-tags.service';
import { CasesModule } from '../cases.module';

@Module({
  controllers: [AssociatedTagsController],
  providers: [
    AssociatedTagsService,
    { provide: AssociatedTagsRepositoryInterface, useClass: AssociatedTagsRepository },
  ],
  exports: [AssociatedTagsService],
  imports: [forwardRef(() => CasesModule), TagsModule],
})
export class AssociatedTagsModule {}

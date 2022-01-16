import { Module } from '@nestjs/common';

import { TagsController } from './controller/tags.controller';
import { TagsRepository } from './tags.repository';
import { TagsService, TagsRepositoryInterface } from './tags.service';

@Module({
  controllers: [TagsController],
  providers: [
    TagsService,
    {
      provide: TagsRepositoryInterface,
      useClass: TagsRepository,
    },
  ],
  exports: [TagsService],
})
export class TagsModule {}

import { Module } from '@nestjs/common';

import { UnderwritersController } from './controller/underwriters.controller';
import { UnderwritersRepository } from './underwriters.repository';
import { UnderwritersService, UnderwritersRepositoryInterface } from './underwriters.service';

@Module({
  controllers: [UnderwritersController],
  providers: [
    UnderwritersService,
    {
      provide: UnderwritersRepositoryInterface,
      useClass: UnderwritersRepository,
    },
  ],
  exports: [UnderwritersService],
})
export class UnderwritersModule {}

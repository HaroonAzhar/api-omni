import { Module } from '@nestjs/common';

import { OriginatorsController } from './controller/originators.controller';
import { OriginatorsRepository } from './originators.repository';
import { OriginatorsService, OriginatorsRepositoryInterface } from './originators.service';

@Module({
  controllers: [OriginatorsController],
  providers: [
    OriginatorsService,
    {
      provide: OriginatorsRepositoryInterface,
      useClass: OriginatorsRepository,
    },
  ],
})
export class OriginatorsModule {}

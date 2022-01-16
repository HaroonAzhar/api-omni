import { Module } from '@nestjs/common';

import { LtvController } from './ltv.controller';
import { LtvService } from './ltv.service';
import { LtvRepository } from './ltv.repository';
import { LtvRepositoryInterface } from './ltv.interface';

@Module({
  controllers: [LtvController],
  providers: [
    {
      provide: LtvRepositoryInterface,
      useClass: LtvRepository,
    },
    LtvService,
  ],
})
export class LtvModule {}

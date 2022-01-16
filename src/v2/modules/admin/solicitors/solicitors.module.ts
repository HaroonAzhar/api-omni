import { Module } from '@nestjs/common';
import { AddressModule } from '@v2/modules/address/address.module';

import { SolicitorsController } from './controller/solicitors.controller';
import { SolicitorsRepository } from './solicitors.repository';
import { SolicitorsService, SolicitorsRepositoryInterface } from './solicitors.service';

@Module({
  controllers: [SolicitorsController],
  providers: [
    SolicitorsService,
    {
      provide: SolicitorsRepositoryInterface,
      useClass: SolicitorsRepository,
    },
  ],
  imports: [AddressModule],
})
export class SolicitorsModule {}

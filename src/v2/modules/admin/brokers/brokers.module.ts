import { Module } from '@nestjs/common';
import { AddressModule } from '@v2/modules/address/address.module';

import { CasesModule } from './../../cases/cases.module';
import { BrokersController } from './controller/brokers.controller';
import { BrokersRepository } from './brokers.repository';
import { BrokersService, BrokersRepositoryInterface, BrokerIndividualsRepositoryInterface } from './brokers.service';
import { BrokerIndividualsRepository } from './broker-individuals.repository';

@Module({
  controllers: [BrokersController],
  providers: [
    BrokersService,
    {
      provide: BrokersRepositoryInterface,
      useClass: BrokersRepository,
    },
    {
      provide: BrokerIndividualsRepositoryInterface,
      useClass: BrokerIndividualsRepository,
    },
  ],
  imports: [AddressModule, CasesModule],
  exports: [BrokersService],
})
export class BrokersModule {}

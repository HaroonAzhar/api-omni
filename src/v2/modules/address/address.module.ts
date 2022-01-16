import { Module } from '@nestjs/common';

import { AddressRepository } from './address.repository';
import { AddressRepositoryInterface, AddressService } from './address.service';

@Module({
  providers: [
    AddressService,
    {
      provide: AddressRepositoryInterface,
      useClass: AddressRepository,
    },
  ],
  exports: [AddressService],
})
export class AddressModule {}

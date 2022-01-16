import { Module } from '@nestjs/common';
import { AddressModule } from '@v2/modules/address/address.module';

import { ContactsController } from './controller/contacts.controller';
import { ContactsRepository } from './contacts.repository';
import { ContactsService, ContactsRepositoryInterface } from './contacts.service';

@Module({
  controllers: [ContactsController],
  providers: [
    ContactsService,
    {
      provide: ContactsRepositoryInterface,
      useClass: ContactsRepository,
    },
  ],
  imports: [AddressModule],
  exports: [ContactsService],
})
export class ContactsModule {}

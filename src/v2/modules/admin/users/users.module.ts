import { Module } from '@nestjs/common';

import { UsersController } from './controller/users.controller';
import { FirebaseIdentitiesProvider } from './firebase-identities.provider';
import { UsersRepository } from './users.repository';
import { UsersService, UsersRepositoryInterface, UserIdentitiesProvider } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UsersRepositoryInterface,
      useClass: UsersRepository,
    },
    {
      provide: UserIdentitiesProvider,
      useClass: FirebaseIdentitiesProvider,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}

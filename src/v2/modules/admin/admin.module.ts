import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { BrokersModule } from './brokers/brokers.module';
import { OriginatorsModule } from './originators/originators.module';
import { SolicitorsModule } from './solicitors/solicitors.module';
import { UnderwritersModule } from './underwriters/underwriters.module';
import { UsersModule } from './users/users.module';
import { WaypointNamesModule } from './waypoint-names/waypoint-name.module';
import { TagsModule } from './tags/tags.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],

  imports: [
    UnderwritersModule,
    OriginatorsModule,
    SolicitorsModule,
    WaypointNamesModule,
    UsersModule,
    TagsModule,
    BrokersModule,
    ContactsModule,
  ],
})
export class AdminModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { ReleaseSecurityHandler } from './handlers/release-security-command.handler';
import { ReleasedSecurityHandler } from './handlers/released-security-event.handler';
import { SecurityReleasesController } from './security-releases.controller';
import { SecurityReleasesRepository } from './security-releases.repository';
import { SecurityReleasesService, SecurityReleasesRepositoryInterface } from './security-releases.service';

const CommandHandlers = [ReleaseSecurityHandler];
const EventHandlers = [ReleasedSecurityHandler];

@Module({
  controllers: [SecurityReleasesController],
  providers: [
    SecurityReleasesService,
    { provide: SecurityReleasesRepositoryInterface, useClass: SecurityReleasesRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [SecurityReleasesService],
  imports: [CqrsModule, CommandsModule, EventsModule],
})
export class SecurityReleasesModule {}

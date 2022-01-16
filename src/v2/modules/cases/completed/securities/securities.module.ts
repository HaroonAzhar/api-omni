import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { ApplicationModule } from '../../application/application.module';
import { CompletedModule } from '../completed.module';
import { CreateSecurityCommandHandler } from './handlers/create-security-command.handler';
import { CreatedSecurityHandler } from './handlers/created-security-event.handler';
import { SecuritiesController } from './securities.controller';
import { SecuritiesRepository } from './securities.repository';
import { SecuritiesService, SecuritiesRepositoryInterface } from './securities.service';
import { SecurityConversionsModule } from './security-conversions/security-conversions.module';
import { SecurityNotesModule } from './security-notes/security-notes.module';
import { SecurityReleasesModule } from './security-releases/security-releases.module';
import { SecurityValuationsModule } from './security-valuations/security-valuations.module';

const CommandHandlers = [CreateSecurityCommandHandler];
const EventHandlers = [CreatedSecurityHandler];
@Module({
  controllers: [SecuritiesController],
  providers: [
    SecuritiesService,
    { provide: SecuritiesRepositoryInterface, useClass: SecuritiesRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [SecuritiesService],
  imports: [
    forwardRef(() => CompletedModule),
    ApplicationModule,
    SecurityNotesModule,
    SecurityReleasesModule,
    SecurityValuationsModule,
    SecurityConversionsModule,
    CqrsModule,
    CommandsModule,
    EventsModule,
  ],
})
export class SecuritiesModule {}

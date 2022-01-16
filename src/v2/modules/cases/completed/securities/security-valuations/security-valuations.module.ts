import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { CreateSecurityValuationHandler } from './handlers/create-security-valuation-command.handler';
import { CreatedSecurityValuationHandler } from './handlers/created-security-valuation-event.handler';
import { SecurityValuationsController } from './security-valuations.controller';
import { SecurityValuationsRepository } from './security-valuations.repository';
import { SecurityValuationsService, SecurityValuationsRepositoryInterface } from './security-valuations.service';

const CommandHandlers = [CreateSecurityValuationHandler];
const EventHandlers = [CreatedSecurityValuationHandler];

@Module({
  controllers: [SecurityValuationsController],
  providers: [
    SecurityValuationsService,
    { provide: SecurityValuationsRepositoryInterface, useClass: SecurityValuationsRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [SecurityValuationsService],
  imports: [CqrsModule, CommandsModule, EventsModule],
})
export class SecurityValuationsModule {}

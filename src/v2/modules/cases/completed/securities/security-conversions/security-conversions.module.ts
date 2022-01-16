import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { ConvertSecurityHandler } from './handlers/convert-security-command.handler';
import { ConvertedSecurityHandler } from './handlers/converted-security-event.handler';
import { SecurityConversionsController } from './security-conversions.controller';
import { SecurityConversionsRepository } from './security-conversions.repository';
import { SecurityConversionsService, SecurityConversionsRepositoryInterface } from './security-conversions.service';

const CommandHandlers = [ConvertSecurityHandler];
const EventHandlers = [ConvertedSecurityHandler];

@Module({
  controllers: [SecurityConversionsController],
  providers: [
    SecurityConversionsService,
    { provide: SecurityConversionsRepositoryInterface, useClass: SecurityConversionsRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [SecurityConversionsService],
  imports: [CqrsModule, CommandsModule, EventsModule],
})
export class SecurityConversionsModule {}

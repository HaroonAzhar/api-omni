import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { CompletedModule } from '../completed.module';
import { ExtensionsController } from './extensions.controller';
import { ExtensionsRepository } from './extensions.repository';
import { ExtensionsService } from './extensions.service';
import { ExtensionsRepositoryInterface } from './extension.interface';
import { CreateExtensionHandler } from './handlers/create-extension-command.handler';
import { CreatedExtensionHandler } from './handlers/created-extension-event.handler';

export const CommandHandlers = [CreateExtensionHandler];
export const EventsHandlers = [CreatedExtensionHandler];

@Module({
  controllers: [ExtensionsController],
  providers: [
    ExtensionsService,
    { provide: ExtensionsRepositoryInterface, useClass: ExtensionsRepository },
    ...CommandHandlers,
    ...EventsHandlers,
  ],
  exports: [ExtensionsService],
  imports: [forwardRef(() => CompletedModule), CqrsModule, CommandsModule, EventsModule],
})
export class ExtensionsModule {}

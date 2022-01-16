import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { CompletedModule } from '../completed.module';
import { CreateExpectedDrawdownHandler } from './handlers/create-expected-drawdown-command.handler';
import { CreatedExpectedDrawdownHandler } from './handlers/created-expected-drawdown-event.handler';
import { UpdateExpectedDrawdownHandler } from './handlers/update-expected-drawdown-command.handler';
import { UpdatedExpectedDrawdownHandler } from './handlers/updated-expected-drawdown-event.handler';
import { ExpectedDrawdownsController } from './expected-drawdowns.controller';
import { ExpectedDrawdownsRepository } from './expected-drawdowns.repository';
import { ExpectedDrawdownsService, ExpectedDrawdownsRepositoryInterface } from './expected-drawdowns.service';
import { DeleteExpectedDrawdownHandler } from './handlers/delete-expected-drawdown-command.handler';
import { DeletedExpectedDrawdownHandler } from './handlers/deleted-expected-drawdown-event.handler';

const CommandHandlers = [CreateExpectedDrawdownHandler, UpdateExpectedDrawdownHandler, DeleteExpectedDrawdownHandler];
const EventHandlers = [CreatedExpectedDrawdownHandler, UpdatedExpectedDrawdownHandler, DeletedExpectedDrawdownHandler];

@Module({
  controllers: [ExpectedDrawdownsController],
  providers: [
    ExpectedDrawdownsService,
    { provide: ExpectedDrawdownsRepositoryInterface, useClass: ExpectedDrawdownsRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [ExpectedDrawdownsService],
  imports: [forwardRef(() => CompletedModule), CqrsModule, CommandsModule, EventsModule],
})
export class ExpectedDrawdownsModule {}

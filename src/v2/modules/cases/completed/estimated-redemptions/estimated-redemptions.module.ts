import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { CompletedModule } from '../completed.module';
import { CreateEstimatedRedemptionHandler } from './handlers/create-estimated-redemption-command.handler';
import { CreatedEstimatedRedemptionHandler } from './handlers/created-estimated-redemption-event.handler';
import { UpdateEstimatedRedemptionHandler } from './handlers/update-estimated-redemption-command.handler';
import { UpdatedEstimatedRedemptionHandler } from './handlers/updated-estimated-redemption-event.handler';
import { EstimatedRedemptionsController } from './estimated-redemptions.controller';
import { EstimatedRedemptionsRepository } from './estimated-redemptions.repository';
import { EstimatedRedemptionsService, EstimatedRedemptionsRepositoryInterface } from './estimated-redemptions.service';
import { DeleteEstimatedRedemptionHandler } from './handlers/delete-estimated-redemption-command.handler';
import { DeletedEstimatedRedemptionHandler } from './handlers/deleted-estimated-redemption-event.handler';
import { CreatedExtensionHandlerEstimatedRedemptions } from './handlers/created-extension-event.handler';
import { SecuritiesModule } from '../securities/securities.module';

const CommandHandlers = [
  CreateEstimatedRedemptionHandler,
  UpdateEstimatedRedemptionHandler,
  DeleteEstimatedRedemptionHandler,
];
const EventHandlers = [
  CreatedEstimatedRedemptionHandler,
  UpdatedEstimatedRedemptionHandler,
  DeletedEstimatedRedemptionHandler,
  CreatedExtensionHandlerEstimatedRedemptions,
];

@Module({
  controllers: [EstimatedRedemptionsController],
  providers: [
    EstimatedRedemptionsService,
    { provide: EstimatedRedemptionsRepositoryInterface, useClass: EstimatedRedemptionsRepository },
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [EstimatedRedemptionsService],
  imports: [forwardRef(() => CompletedModule), CqrsModule, CommandsModule, EventsModule, SecuritiesModule],
})
export class EstimatedRedemptionsModule {}

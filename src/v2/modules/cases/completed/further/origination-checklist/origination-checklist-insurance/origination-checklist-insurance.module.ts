import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '@v2/utils/commands';
import { EventsModule } from '@v2/utils/events';

import { OriginationChecklistModule } from '../origination-checklist.module';
import { OriginationChecklistInsuranceController } from './origination-checklist-insurance.controller';
import { OriginationChecklistInsuranceRepository } from './origination-checklist-insurance.repository';
import {
  OriginationChecklistInsuranceService,
  OriginationChecklistInsuranceRepositoryInterface,
} from './origination-checklist-insurance.service';

@Module({
  controllers: [OriginationChecklistInsuranceController],
  providers: [
    OriginationChecklistInsuranceService,
    { provide: OriginationChecklistInsuranceRepositoryInterface, useClass: OriginationChecklistInsuranceRepository },
  ],
  exports: [OriginationChecklistInsuranceService],
  imports: [forwardRef(() => OriginationChecklistModule), CqrsModule, EventsModule, CommandsModule],
})
export class OriginationChecklistInsuranceModule {}

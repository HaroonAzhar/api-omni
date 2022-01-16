import { forwardRef, Module } from '@nestjs/common';

import { CompletedRepository } from './completed.repository';
import { CompletedService, CompletedRepositoryInterface } from './completed.service';
import { AdjustmentsModule } from './adjustments/adjustments.module';
import { DipModule } from '../dip/dip.module';
import { WaypointsModule } from './waypoints/waypoints.module';
import { NotesModule } from './notes/notes.module';
import {
  CompletedIdentificationRepositoryInterface,
  CompletedIdentificationService,
} from './completed-identification.service';
import { CasesModule } from '../cases.module';
import { CompletedController } from './completed.controller';
import { DefaultEventsModule } from './default-events/default-events.module';
import { ExtensionsModule } from './extensions/extension.module';
import { ManualStatusesModule } from './manual-statuses/manual-statuses.module';
import { CashflowsModule } from './cashflows/cashflows.module';
import { ApplicationModule } from '../application/application.module';
import { SecuritiesModule } from './securities/securities.module';
import { FurtherDrawdownsModule } from './further-drawdowns/further-drawdowns.module';
import { EstimatedRedemptionsModule } from './estimated-redemptions/estimated-redemptions.module';
import { ExpectedDrawdownsModule } from './expected-drawdowns/expected-drawdowns.module';
import { FurtherAdvancesModule } from './further-advances/further-advances.module';

@Module({
  controllers: [CompletedController],
  providers: [
    CompletedService,
    { provide: CompletedRepositoryInterface, useClass: CompletedRepository },
    CompletedIdentificationService,
    { provide: CompletedIdentificationRepositoryInterface, useClass: CompletedRepository },
  ],
  exports: [CompletedService, CompletedIdentificationService],
  imports: [
    forwardRef(() => AdjustmentsModule),
    forwardRef(() => WaypointsModule),
    forwardRef(() => NotesModule),
    DipModule,
    forwardRef(() => CasesModule),
    forwardRef(() => DefaultEventsModule),
    forwardRef(() => ExtensionsModule),
    forwardRef(() => ManualStatusesModule),
    forwardRef(() => CashflowsModule),
    ApplicationModule,
    forwardRef(() => SecuritiesModule),
    forwardRef(() => FurtherDrawdownsModule),
    forwardRef(() => EstimatedRedemptionsModule),
    forwardRef(() => ExpectedDrawdownsModule),
    forwardRef(() => FurtherAdvancesModule),
  ],
})
export class CompletedModule {}

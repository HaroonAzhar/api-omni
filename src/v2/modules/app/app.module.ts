import { Module } from '@nestjs/common';
import { KnexModule } from '@v2/utils/knex';
import { FirebaseAdminModule } from '@v2/utils/firebase-admin';

import { AdminModule } from '../admin/admin.module';
import { AllWaypointsModule } from '../all-waypoints/all-waypoints.module';
import { CasesModule } from '../cases/cases.module';
import { LtvModule } from '../ltv/ltv.module';
import { PingModule } from '../ping/ping.module';
import { AvailableFundingModule } from '../available-funding/available-funding.module';
import { StoredCashflowModule } from '../stored-cashflows/stored-cashflows.module';

@Module({
  imports: [
    KnexModule,
    LtvModule,
    AdminModule,
    CasesModule,
    PingModule,
    AllWaypointsModule,
    FirebaseAdminModule,
    AvailableFundingModule,
    StoredCashflowModule,
  ],
})
export class AppModule {}

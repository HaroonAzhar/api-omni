import { Module } from '@nestjs/common';

import { AllWaypointsRepositoryInterface, AllWaypointsService } from './all-waypoints.service';
import { AllWaypointsController } from './all-waypoints.controller';
import { AllWaypointsRepository } from './all-waypoints.repository';

@Module({
  providers: [AllWaypointsService, { provide: AllWaypointsRepositoryInterface, useClass: AllWaypointsRepository }],
  controllers: [AllWaypointsController],
})
export class AllWaypointsModule {}

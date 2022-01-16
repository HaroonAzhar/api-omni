import { forwardRef, Module } from '@nestjs/common';

import { CompletedModule } from '../completed.module';
import { WaypointsController } from './waypoints.controller';
import { WaypointsRepository } from './waypoints.repository';
import { WaypointsService, WaypointsRepositoryInterface } from './waypoints.service';

@Module({
  controllers: [WaypointsController],
  providers: [WaypointsService, { provide: WaypointsRepositoryInterface, useClass: WaypointsRepository }],
  exports: [WaypointsService],
  imports: [forwardRef(() => CompletedModule)],
})
export class WaypointsModule {}

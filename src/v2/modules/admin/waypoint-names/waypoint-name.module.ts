import { Module } from '@nestjs/common';

import { WaypointNamesController } from './controller/waypoint-name.controller';
import { WaypointNamesRepository } from './waypoint-name.repository';
import { WaypointNamesService, WaypointNamesRepositoryInterface } from './waypoint-name.service';

@Module({
  controllers: [WaypointNamesController],
  providers: [
    WaypointNamesService,
    {
      provide: WaypointNamesRepositoryInterface,
      useClass: WaypointNamesRepository,
    },
  ],
})
export class WaypointNamesModule {}

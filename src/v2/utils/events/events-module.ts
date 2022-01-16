import { Module } from '@nestjs/common';

import { EventsRepository } from './events-repository';

@Module({
  exports: [EventsRepository],
  providers: [EventsRepository],
})
export class EventsModule {}

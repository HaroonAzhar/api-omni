import { Global, Module } from '@nestjs/common';

import { KnexService } from './knex.service';
import { connectionFactory } from './knex-connection.provider';

@Global()
@Module({
  providers: [KnexService, connectionFactory],
  exports: [KnexService, connectionFactory],
})
export class KnexModule {}

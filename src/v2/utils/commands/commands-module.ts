import { Module } from '@nestjs/common';

import { CommandsRepository } from './commands-repository';

@Module({
  exports: [CommandsRepository],
  providers: [CommandsRepository],
})
export class CommandsModule {}

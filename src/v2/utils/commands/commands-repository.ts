import { Inject, Injectable } from '@nestjs/common';

import { KnexInstance, KNEX_CONNECTION } from '../knex';
import { BaseCommand } from './base-command.interface';

@Injectable()
export class CommandsRepository {
  private readonly commandsTable = 'Servicing.Commands';
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {}
  async insert(command: BaseCommand) {
    return await this.knex(this.commandsTable).insert(
      {
        ...command.context,
        Name: command.constructor.name,
        Content: JSON.stringify(command.content),
      },
      'CommandId'
    );
  }
}

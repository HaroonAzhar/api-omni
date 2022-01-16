import { Injectable, Logger } from '@nestjs/common';
import Knex from 'knex';
import knexConnection from '@v2/../db';

@Injectable()
export class KnexService {
  private readonly logger: Logger;
  private _knexConnection: Knex;

  constructor() {
    this._knexConnection = knexConnection;

    this.logger = new Logger('KnexService');
    this.logger.log('Injectable Knex is initialized by existed connection.');
  }

  getKnex() {
    return this._knexConnection;
  }
}

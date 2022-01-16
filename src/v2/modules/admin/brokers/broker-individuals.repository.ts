import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION, KnexInstance } from '@v2/utils/knex';

import { BrokerIndividualsRepositoryInterface } from './brokers.service';
import { CreateBrokerIndividualEntity, UpdateBrokerIndividualEntity, BrokerIndividualEntity } from './broker.interface';

@Injectable()
export class BrokerIndividualsRepository implements BrokerIndividualsRepositoryInterface {
  private readonly table = 'OriginationAdmin.BrokerIndividuals';
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {}

  async create(entity: CreateBrokerIndividualEntity): Promise<number> {
    const [Id] = await this.knex(this.table).insert(entity, ['Id']);
    return Id;
  }

  async getAll(FkBrokerId: number): Promise<BrokerIndividualEntity[]> {
    const query = this.knex(this.table);

    return query.select<BrokerIndividualEntity[]>().where({ FkBrokerId });
  }

  async getOne(Id: number): Promise<BrokerIndividualEntity> {
    const [entity] = await this.knex(this.table).select<BrokerIndividualEntity[]>().where({ Id });
    return entity;
  }

  async update(Id: number, entity: UpdateBrokerIndividualEntity): Promise<void> {
    await this.knex(this.table).update(entity).where({ Id });
  }
}

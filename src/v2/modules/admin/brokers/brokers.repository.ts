import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION, KnexInstance } from '@v2/utils/knex';

import { BrokersRepositoryInterface } from './brokers.service';
import { CreateBrokerEntity, UpdateBrokerEntity, BrokerEntity, Broker } from './broker.interface';

@Injectable()
export class BrokersRepository implements BrokersRepositoryInterface {
  private readonly brokersTable = 'OriginationAdmin.Brokers';
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {}

  async create(entity: CreateBrokerEntity): Promise<number> {
    const [Id] = await this.knex(this.brokersTable).insert(entity, ['Id']);
    return Id;
  }

  async getAll(): Promise<BrokerEntity[]> {
    const query = this.knex(this.brokersTable);

    return query.select<BrokerEntity[]>();
  }

  async getOne(Id: number): Promise<BrokerEntity> {
    const [entity] = await this.knex(this.brokersTable).select<BrokerEntity[]>().where({ Id });
    return entity;
  }

  async update(Id: number, entity: UpdateBrokerEntity): Promise<void> {
    await this.knex(this.brokersTable).update(entity).where({ Id });
  }
}

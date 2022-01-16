import { KnexInstance } from '@v2/utils/knex';

import { BaseAdminInterface } from './baseAdmin.interface';

export class BaseAdminRepository<Entity extends BaseAdminInterface> {
  constructor(protected readonly knex: KnexInstance, private readonly table: string) {}

  async create(entity: Entity): Promise<number> {
    delete entity.Id;
    const [Id] = await this.knex(this.table).insert(entity, ['Id']);
    return Id;
  }

  async getAll(): Promise<Entity[]> {
    const query = this.knex(this.table);

    return query.select<Entity[]>();
  }

  async getOne(id: number): Promise<Entity> {
    const [entity] = await this.knex(this.table).select<Entity[]>().where({ Id: id });
    return entity;
  }

  async update(entity: Entity): Promise<void> {
    const Id = entity.Id;
    delete entity.Id;
    await this.knex(this.table).update(entity).where({ Id });
  }
}

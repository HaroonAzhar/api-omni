import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION, KnexInstance } from '@v2/utils/knex';

import { ContactsRepositoryInterface } from './contacts.service';
import { CreateContactEntity, UpdateContactEntity, ContactEntity } from './contact.interface';

@Injectable()
export class ContactsRepository implements ContactsRepositoryInterface {
  private readonly table = 'OriginationAdmin.Contacts';
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {}

  async create(entity: CreateContactEntity): Promise<number> {
    const [Id] = await this.knex(this.table).insert(entity, ['Id']);
    return Id;
  }

  async getAll(): Promise<ContactEntity[]> {
    const query = this.knex(this.table);

    return query.select<ContactEntity[]>();
  }

  async getOne(Id: number): Promise<ContactEntity> {
    const [entity] = await this.knex(this.table).select<ContactEntity[]>().where({ Id });
    return entity;
  }

  async update(Id: number, entity: UpdateContactEntity): Promise<void> {
    await this.knex(this.table).update(entity).where({ Id });
  }

  async find(search: string): Promise<ContactEntity[]> {
    const query = this.knex(this.table);

    const likeSearch = `%${search}%`;
    return query
      .select<ContactEntity[]>()
      .where(this.knex.raw('Forename like ?', likeSearch))
      .orWhere(this.knex.raw('Surname like ?', likeSearch))
      .orWhere(this.knex.raw('MiddleName like ?', likeSearch));
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION, KnexInstance } from '@v2/utils/knex';

import { AddressRepositoryInterface } from './address.service';
import { Address } from './address.interface';

@Injectable()
export class AddressRepository implements AddressRepositoryInterface {
  private table = 'Origination.Address';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {}

  async create(address: Address): Promise<number> {
    delete address.Id;
    const [Id] = await this.knex(this.table).insert(address, ['Id']);
    return Id;
  }

  async getOne(id: number): Promise<Address> {
    const [address] = await this.knex(this.table).select<Address[]>().where({ Id: id });
    return address;
  }

  async update(address: Address): Promise<void> {
    const Id = address.Id;
    delete address.Id;
    let toSave = address;
    if (address.Line2 === undefined) {
      toSave = {
        ...toSave,
        Line2: '',
      };
    }
    await this.knex(this.table).update(toSave).where({ Id });
  }
}

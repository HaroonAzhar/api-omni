import { Injectable } from '@nestjs/common';

import { Address } from './address.interface';

export abstract class AddressRepositoryInterface {
  abstract create(address: Address): Promise<number>;

  abstract getOne(id: number): Promise<Address>;

  abstract update(address: Address): Promise<void>;
}

@Injectable()
export class AddressService {
  constructor(private repository: AddressRepositoryInterface) {}

  async addAddress(entry: Address) {
    return await this.repository.create(entry);
  }

  async getAddress(id: number) {
    return await this.repository.getOne(id);
  }

  async updateAddress(id: number, address: Address) {
    address.Id = id;
    await this.repository.update(address);
  }
}

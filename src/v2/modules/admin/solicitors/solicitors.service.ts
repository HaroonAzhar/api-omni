import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressService } from '@v2/modules/address/address.service';

import { BaseAdminEntity } from '../baseGeneric/baseAdmin.entity';
import { BaseAdminRepositoryInterface } from '../baseGeneric/baseAdmin.repository.interface';
import { Solicitor } from './solicitor.interface';

export abstract class SolicitorsRepositoryInterface extends BaseAdminRepositoryInterface<SolicitorEntity> {}

export class SolicitorEntity extends BaseAdminEntity<Solicitor> implements Solicitor {
  constructor(solicitor: Solicitor, FkAddressId: number) {
    super(solicitor);
    this.FkAddressId = FkAddressId;
  }
  FkAddressId: number;
}

@Injectable()
export class SolicitorsService {
  constructor(private repository: SolicitorsRepositoryInterface, private addressService: AddressService) {}

  async get(currentRecordId?: number | string): Promise<Solicitor[]> {
    const allSolicitors = await this.repository.getAll();
    const validSolicitors = allSolicitors.filter(
      (entity: SolicitorEntity) => entity.IsDeleted === false || entity.Id == currentRecordId
    );
    const solicitorsWithAddress: Solicitor[] = await Promise.all(
      validSolicitors.map(async (entity: SolicitorEntity) => {
        const { FkAddressId, ...rest } = entity;
        const address = await this.addressService.getAddress(FkAddressId);

        return { ...rest, Address: address };
      })
    );
    return solicitorsWithAddress;
  }

  async add(entry: Solicitor) {
    const FkAddressId = await this.addressService.addAddress(entry.Address);

    return await this.repository.create(new SolicitorEntity(entry, FkAddressId));
  }

  async update(id: number, entry: Solicitor) {
    entry.Id = id;

    const existingSolicitor = await this.repository.getOne(id);

    if (entry.Address) {
      await this.addressService.updateAddress(existingSolicitor.FkAddressId, entry.Address);
    }
    await this.repository.update(new SolicitorEntity(entry, existingSolicitor.FkAddressId));
  }

  async remove(id: number) {
    const solicitor = await this.repository.getOne(id);
    if (!solicitor) {
      throw Error('Not found');
    }
    solicitor.IsDeleted = true;
    await this.repository.update(solicitor);
  }

  async getOne(id: number) {
    const solicitor = await this.repository.getOne(id);
    if (!solicitor) {
      throw new NotFoundException();
    }
    const address = await this.addressService.getAddress(solicitor.FkAddressId);
    return { ...solicitor, Address: address };
  }
}

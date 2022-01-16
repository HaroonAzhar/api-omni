import { Injectable } from '@nestjs/common';

import { BaseAdminEntity } from '../baseGeneric/baseAdmin.entity';
import { BaseAdminRepositoryInterface } from '../baseGeneric/baseAdmin.repository.interface';
import { Originator } from './originator.interface';

export abstract class OriginatorsRepositoryInterface extends BaseAdminRepositoryInterface<OriginatorEntity> {}

export class OriginatorEntity extends BaseAdminEntity<Originator> implements Originator {}

@Injectable()
export class OriginatorsService {
  constructor(private repository: OriginatorsRepositoryInterface) {}
  async get(currentRecordId?: number | string): Promise<Originator[]> {
    const allOriginators = await this.repository.getAll();
    return allOriginators.filter(
      (entity: OriginatorEntity) => entity.IsDeleted === false || entity.Id == currentRecordId
    );
  }
  async add(entry: Originator) {
    return await this.repository.create(new OriginatorEntity(entry));
  }
  async update(id: number, entry: Originator) {
    entry.Id = id;
    await this.repository.update(new OriginatorEntity(entry));
  }
  async remove(id: number) {
    const originator = await this.repository.getOne(id);
    if (!originator) {
      throw Error('Not found');
    }
    originator.IsDeleted = true;
    await this.repository.update(originator);
  }
  async getOne(id: number) {
    return await this.repository.getOne(id);
  }
}

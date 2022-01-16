import { Injectable } from '@nestjs/common';

import { BaseAdminEntity } from '../baseGeneric/baseAdmin.entity';
import { BaseAdminRepositoryInterface } from '../baseGeneric/baseAdmin.repository.interface';
import { Underwriter } from './underwriter.interface';

export abstract class UnderwritersRepositoryInterface extends BaseAdminRepositoryInterface<UnderwriterEntity> {}

export class UnderwriterEntity extends BaseAdminEntity<Underwriter> implements Underwriter {}

@Injectable()
export class UnderwritersService {
  constructor(private repository: UnderwritersRepositoryInterface) {}
  async get(currentRecordId?: number | string): Promise<Underwriter[]> {
    const allUnderwriters = await this.repository.getAll();
    return allUnderwriters.filter(
      (entity: UnderwriterEntity) => entity.IsDeleted === false || entity.Id == currentRecordId
    );
  }
  async add(entry: Underwriter) {
    return await this.repository.create(new UnderwriterEntity(entry));
  }
  async update(id: number, entry: Underwriter) {
    entry.Id = id;
    await this.repository.update(new UnderwriterEntity(entry));
  }
  async remove(id: number) {
    const underwriter = await this.repository.getOne(id);
    if (!underwriter) {
      throw Error('Not found');
    }
    underwriter.IsDeleted = true;
    await this.repository.update(underwriter);
  }

  async getOne(id: number) {
    return await this.repository.getOne(id);
  }
}

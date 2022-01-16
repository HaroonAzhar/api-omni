import { Injectable } from '@nestjs/common';

import { BaseAdminEntity } from '../baseGeneric/baseAdmin.entity';
import { BaseAdminRepositoryInterface } from '../baseGeneric/baseAdmin.repository.interface';
import { WaypointName } from './waypoint-name.interface';

export abstract class WaypointNamesRepositoryInterface extends BaseAdminRepositoryInterface<WaypointNameEntity> {}

export class WaypointNameEntity extends BaseAdminEntity<WaypointName> implements WaypointName {}

@Injectable()
export class WaypointNamesService {
  constructor(private repository: WaypointNamesRepositoryInterface) {}
  async get(currentRecordId?: number | string): Promise<WaypointName[]> {
    const allWaypointNames = await this.repository.getAll();
    return allWaypointNames.filter(
      (entity: WaypointNameEntity) => entity.IsDeleted === false || entity.Id == currentRecordId
    );
  }
  async add(entry: WaypointName) {
    return await this.repository.create(new WaypointNameEntity(entry));
  }
  async update(id: number, entry: WaypointName) {
    entry.Id = id;
    await this.repository.update(new WaypointNameEntity(entry));
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

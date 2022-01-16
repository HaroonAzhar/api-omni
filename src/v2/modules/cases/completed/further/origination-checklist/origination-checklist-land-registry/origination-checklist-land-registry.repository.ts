import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateOriginationChecklistLandRegistryEntity,
  OriginationChecklistLandRegistryEntity,
  UpdateOriginationChecklistLandRegistryEntity,
  OriginationChecklistLandRegistryResultEntity,
  CreateOriginationChecklistLandRegistryResultEntity,
} from './origination-checklist-land-registry.interface';
import { OriginationChecklistLandRegistryRepositoryInterface } from './origination-checklist-land-registry.service';

@Injectable()
export class OriginationChecklistLandRegistryRepository extends OriginationChecklistLandRegistryRepositoryInterface {
  private originationChecklistLandRegistryTable = 'Servicing.OriginationChecklistLandRegistry';
  private resultsTable = 'Servicing.OriginationChecklistLandRegistryResults';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(landRegistry: CreateOriginationChecklistLandRegistryEntity): Promise<number> {
    const [Id] = await this.knex(this.originationChecklistLandRegistryTable).insert(landRegistry, [
      'OriginationChecklistLandRegistryId',
    ]);
    return Id;
  }

  async update(
    FkOriginationChecklistId: number,
    landRegistry: UpdateOriginationChecklistLandRegistryEntity
  ): Promise<void> {
    await this.knex(this.originationChecklistLandRegistryTable)
      .update(landRegistry)
      .where({ FkOriginationChecklistId });
  }

  async get(FkOriginationChecklistId: number): Promise<OriginationChecklistLandRegistryEntity> {
    const [landRegistry] = await this.knex(this.originationChecklistLandRegistryTable)
      .select<OriginationChecklistLandRegistryEntity[]>()
      .where({ FkOriginationChecklistId });

    return landRegistry;
  }

  async getResults(
    FkOriginationChecklistLandRegistryId: number
  ): Promise<OriginationChecklistLandRegistryResultEntity[]> {
    return this.knex(this.resultsTable)
      .select<OriginationChecklistLandRegistryResultEntity[]>()
      .where({ FkOriginationChecklistLandRegistryId });
  }
  async addResult(
    FkOriginationChecklistLandRegistryId: number,
    result: CreateOriginationChecklistLandRegistryResultEntity
  ): Promise<number> {
    return this.knex(this.resultsTable).insert({ ...result, FkOriginationChecklistLandRegistryId });
  }
}

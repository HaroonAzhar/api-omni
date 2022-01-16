import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { OriginationChecklistIdentification } from '../origination-checklist.identification';
import { AddOriginationChecklistLandRegistryResultEntity } from './origination-checklist-land-registry.commands';
import {
  CreateOriginationChecklistLandRegistryEntity,
  OriginationChecklistLandRegistryEntity,
  OriginationChecklistLandRegistry,
  UpdateOriginationChecklistLandRegistryEntity,
  moduleName,
  OriginationChecklistLandRegistryResultEntity,
  CreateOriginationChecklistLandRegistryResultEntity,
} from './origination-checklist-land-registry.interface';
import { OriginationChecklistSectionService } from '../section-shared/origination-checklist-section.service';

export abstract class OriginationChecklistLandRegistryRepositoryInterface {
  abstract create(landRegistry: CreateOriginationChecklistLandRegistryEntity): Promise<number>;
  abstract update(
    FkOriginationChecklistId: number,
    landRegistry: UpdateOriginationChecklistLandRegistryEntity
  ): Promise<void>;
  abstract get(FkOriginationChecklistId: number): Promise<OriginationChecklistLandRegistryEntity>;
  abstract getResults(
    FkOriginationChecklistLandRegistryId: number
  ): Promise<OriginationChecklistLandRegistryResultEntity[]>;
  abstract addResult(
    FkOriginationChecklistLandRegistryId: number,
    result: CreateOriginationChecklistLandRegistryResultEntity
  ): Promise<number>;
}

@Injectable()
export class OriginationChecklistLandRegistryService extends OriginationChecklistSectionService {
  protected readonly moduleName = moduleName;

  constructor(
    protected readonly repository: OriginationChecklistLandRegistryRepositoryInterface,
    protected readonly originationChecklistService: OriginationChecklistIdentification,
    protected readonly commandBus: CommandBus,
    protected readonly originationChecklistIdentification: OriginationChecklistIdentification
  ) {
    super();
  }

  async createLandRegistry(FkOriginationChecklistId: number): Promise<number> {
    return this.repository.create({ FkOriginationChecklistId });
  }

  async getLandRegistry(FkOriginationChecklistId: number): Promise<OriginationChecklistLandRegistry> {
    const landRegistryEntity = await this.repository.get(FkOriginationChecklistId);

    const results = await this.repository.getResults(landRegistryEntity.OriginationChecklistLandRegistryId);

    return OriginationChecklistLandRegistryService.fillLandRegistry(landRegistryEntity, results);
  }
  static fillLandRegistry(
    landRegistryEntity: OriginationChecklistLandRegistryEntity,
    results: OriginationChecklistLandRegistryResultEntity[]
  ): OriginationChecklistLandRegistry {
    const sharedComputed = OriginationChecklistSectionService.fillShared(landRegistryEntity);

    const landRegistry: OriginationChecklistLandRegistry = { ...landRegistryEntity, results, ...sharedComputed };

    return landRegistry;
  }

  async addResult(
    furtherDrawdownId: number,
    furtherType: string,
    result: CreateOriginationChecklistLandRegistryResultEntity,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const originationChecklistId = await this.originationChecklistIdentification.getId(furtherDrawdownId, furtherType);
    const landRegistry = await this.getLandRegistry(originationChecklistId);
    await this.repository.addResult(landRegistry.OriginationChecklistLandRegistryId, result);
    await this.commandBus.execute(
      new AddOriginationChecklistLandRegistryResultEntity(
        {
          ...result,
          FkOriginationChecklistLandRegistryId: landRegistry.OriginationChecklistLandRegistryId,
        },
        context
      )
    );
  }
}

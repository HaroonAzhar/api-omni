import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { OriginationChecklistIdentification } from '../origination-checklist.identification';
import { MarkCheckFacilityLetter, AddResult, UpdateResult } from './origination-checklist-land-charges.commands';
import {
  CreateOriginationChecklistLandChargesEntity,
  OriginationChecklistLandChargesEntity,
  OriginationChecklistLandCharges,
  UpdateOriginationChecklistLandChargesEntity,
  moduleName,
  OriginationChecklistLandChargesResultEntity,
  CreateOriginationChecklistLandChargesResultEntity,
} from './origination-checklist-land-charges.interface';
import { OriginationChecklistSectionService } from '../section-shared/origination-checklist-section.service';

export abstract class OriginationChecklistLandChargesRepositoryInterface {
  abstract create(landCharges: CreateOriginationChecklistLandChargesEntity): Promise<number>;
  abstract update(
    FkOriginationChecklistId: number,
    landCharges: UpdateOriginationChecklistLandChargesEntity
  ): Promise<void>;
  abstract get(FkOriginationChecklistId: number): Promise<OriginationChecklistLandChargesEntity>;
  abstract getResults(
    FkOriginationChecklistLandChargesId: number
  ): Promise<OriginationChecklistLandChargesResultEntity[]>;
  abstract addResult(
    FkOriginationChecklistLandChargesId: number,
    result: CreateOriginationChecklistLandChargesResultEntity
  ): Promise<number>;

  abstract updateResult(
    OriginationChecklistLandChargesResultsId: number,
    result: CreateOriginationChecklistLandChargesResultEntity
  ): Promise<number>;
}

@Injectable()
export class OriginationChecklistLandChargesService extends OriginationChecklistSectionService {
  protected readonly moduleName = moduleName;

  constructor(
    protected readonly repository: OriginationChecklistLandChargesRepositoryInterface,
    protected readonly originationChecklistService: OriginationChecklistIdentification,
    protected readonly commandBus: CommandBus
  ) {
    super();
  }

  async createLandCharges(FkOriginationChecklistId: number): Promise<number> {
    return this.repository.create({ FkOriginationChecklistId });
  }

  async getLandCharges(FkOriginationChecklistId: number): Promise<OriginationChecklistLandCharges> {
    const landChargesEntity = await this.repository.get(FkOriginationChecklistId);

    const results = await this.repository.getResults(landChargesEntity.OriginationChecklistLandChargesId);

    return OriginationChecklistLandChargesService.fillLandCharges(landChargesEntity, results);
  }
  static fillLandCharges(
    landChargesEntity: OriginationChecklistLandChargesEntity,
    results: OriginationChecklistLandChargesResultEntity[]
  ): OriginationChecklistLandCharges {
    const sharedComputed = OriginationChecklistSectionService.fillShared(landChargesEntity);

    const landCharges: OriginationChecklistLandCharges = { ...landChargesEntity, results, ...sharedComputed };

    return landCharges;
  }

  async markCheckFacilityLetter(
    furtherDrawdownId: number,
    furtherType: string,
    CheckFacilityLetter: boolean,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      CheckFacilityLetter,
    });
    await this.commandBus.execute(
      new MarkCheckFacilityLetter({ FkOriginationChecklistId, content: CheckFacilityLetter }, context)
    );
  }

  async addResult(
    furtherDrawdownId: number,
    furtherType: string,
    result: CreateOriginationChecklistLandChargesResultEntity,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const originationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    const landCharges = await this.getLandCharges(originationChecklistId);
    const OriginationChecklistLandChargesResultsId = await this.repository.addResult(
      landCharges.OriginationChecklistLandChargesId,
      result
    );
    await this.commandBus.execute(
      new AddResult(
        {
          ...result,
          OriginationChecklistLandChargesResultsId,
          FkOriginationChecklistLandChargesId: landCharges.OriginationChecklistLandChargesId,
        },
        context
      )
    );
  }

  async updateResult(
    OriginationChecklistLandChargesResultsId: number,
    result: CreateOriginationChecklistLandChargesResultEntity,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    await this.repository.updateResult(OriginationChecklistLandChargesResultsId, result);
    await this.commandBus.execute(
      new UpdateResult(
        {
          ...result,
          OriginationChecklistLandChargesResultsId,
        },
        context
      )
    );
  }
}

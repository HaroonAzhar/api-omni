import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { OriginationChecklistIdentification } from '../origination-checklist.identification';
import {
  CreateOriginationChecklistExperianEntity,
  OriginationChecklistExperianEntity,
  OriginationChecklistExperian,
  UpdateOriginationChecklistExperianEntity,
  moduleName,
} from './origination-checklist-experian.interface';
import { OriginationChecklistSectionService } from '../section-shared/origination-checklist-section.service';

export abstract class OriginationChecklistExperianRepositoryInterface {
  abstract create(experian: CreateOriginationChecklistExperianEntity): Promise<number>;
  abstract update(FkOriginationChecklistId: number, experian: UpdateOriginationChecklistExperianEntity): Promise<void>;
  abstract get(FkOriginationChecklistId: number): Promise<OriginationChecklistExperianEntity>;
}

@Injectable()
export class OriginationChecklistExperianService extends OriginationChecklistSectionService {
  protected readonly moduleName = moduleName;

  constructor(
    protected readonly repository: OriginationChecklistExperianRepositoryInterface,
    protected readonly originationChecklistService: OriginationChecklistIdentification,
    protected readonly commandBus: CommandBus
  ) {
    super();
  }

  async createExperian(FkOriginationChecklistId: number): Promise<number> {
    return this.repository.create({ FkOriginationChecklistId });
  }

  async getExperian(FkOriginationChecklistId: number): Promise<OriginationChecklistExperian> {
    const experianEntity = await this.repository.get(FkOriginationChecklistId);

    return OriginationChecklistExperianService.fillExperian(experianEntity);
  }
  static fillExperian(experianEntity: OriginationChecklistExperianEntity): OriginationChecklistExperian {
    const sharedComputed = OriginationChecklistSectionService.fillShared(experianEntity);
    const experian: OriginationChecklistExperian = { ...experianEntity, ...sharedComputed };

    return experian;
  }
}

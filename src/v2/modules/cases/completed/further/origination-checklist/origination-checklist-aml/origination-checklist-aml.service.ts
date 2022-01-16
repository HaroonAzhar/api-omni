import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { OriginationChecklistIdentification } from '../origination-checklist.identification';
import {
  CreateOriginationChecklistAmlEntity,
  OriginationChecklistAmlEntity,
  OriginationChecklistAml,
  UpdateOriginationChecklistAmlEntity,
  moduleName,
} from './origination-checklist-aml.interface';
import { OriginationChecklistSectionService } from '../section-shared/origination-checklist-section.service';

export abstract class OriginationChecklistAmlRepositoryInterface {
  abstract create(aml: CreateOriginationChecklistAmlEntity): Promise<number>;
  abstract update(FkOriginationChecklistId: number, aml: UpdateOriginationChecklistAmlEntity): Promise<void>;
  abstract get(FkOriginationChecklistId: number): Promise<OriginationChecklistAmlEntity>;
}

@Injectable()
export class OriginationChecklistAmlService extends OriginationChecklistSectionService {
  protected readonly moduleName = moduleName;
  constructor(
    protected readonly repository: OriginationChecklistAmlRepositoryInterface,
    protected readonly originationChecklistService: OriginationChecklistIdentification,
    protected readonly commandBus: CommandBus
  ) {
    super();
  }

  async createAml(FkOriginationChecklistId: number): Promise<number> {
    return this.repository.create({ FkOriginationChecklistId });
  }

  async getAml(FkOriginationChecklistId: number): Promise<OriginationChecklistAml> {
    const amlEntity = await this.repository.get(FkOriginationChecklistId);

    return OriginationChecklistAmlService.fillAml(amlEntity);
  }
  static fillAml(amlEntity: OriginationChecklistAmlEntity): OriginationChecklistAml {
    const sharedComputed = OriginationChecklistSectionService.fillShared(amlEntity);

    const aml: OriginationChecklistAml = {
      ...amlEntity,
      ...sharedComputed,
    };

    return aml;
  }
}

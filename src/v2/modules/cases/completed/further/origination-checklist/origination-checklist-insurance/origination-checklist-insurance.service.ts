import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { OriginationChecklistIdentification } from '../origination-checklist.identification';
import {
  CreateOriginationChecklistInsuranceEntity,
  OriginationChecklistInsuranceEntity,
  OriginationChecklistInsurance,
  UpdateOriginationChecklistInsuranceEntity,
  moduleName,
} from './origination-checklist-insurance.interface';
import { OriginationChecklistSectionService } from '../section-shared/origination-checklist-section.service';

export abstract class OriginationChecklistInsuranceRepositoryInterface {
  abstract create(insurance: CreateOriginationChecklistInsuranceEntity): Promise<number>;
  abstract update(
    FkOriginationChecklistId: number,
    insurance: UpdateOriginationChecklistInsuranceEntity
  ): Promise<void>;
  abstract get(FkOriginationChecklistId: number): Promise<OriginationChecklistInsuranceEntity>;
}

@Injectable()
export class OriginationChecklistInsuranceService extends OriginationChecklistSectionService {
  protected readonly moduleName = moduleName;

  constructor(
    protected readonly repository: OriginationChecklistInsuranceRepositoryInterface,
    protected readonly originationChecklistService: OriginationChecklistIdentification,
    protected readonly commandBus: CommandBus
  ) {
    super();
  }

  async createInsurance(FkOriginationChecklistId: number): Promise<number> {
    return this.repository.create({ FkOriginationChecklistId });
  }

  async getInsurance(FkOriginationChecklistId: number): Promise<OriginationChecklistInsurance> {
    const insuranceEntity = await this.repository.get(FkOriginationChecklistId);

    return OriginationChecklistInsuranceService.fillInsurance(insuranceEntity);
  }
  static fillInsurance(insuranceEntity: OriginationChecklistInsuranceEntity): OriginationChecklistInsurance {
    const sharedComputed = OriginationChecklistSectionService.fillShared(insuranceEntity);

    const insurance: OriginationChecklistInsurance = { ...insuranceEntity, ...sharedComputed };
    return insurance;
  }
}

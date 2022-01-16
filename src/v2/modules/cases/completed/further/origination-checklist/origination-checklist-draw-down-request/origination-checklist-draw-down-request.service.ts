import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { OriginationChecklistIdentification } from '../origination-checklist.identification';
import {
  CreateOriginationChecklistDrawDownRequestEntity,
  OriginationChecklistDrawDownRequestEntity,
  OriginationChecklistDrawDownRequest,
  UpdateOriginationChecklistDrawDownRequestEntity,
  moduleName,
} from './origination-checklist-draw-down-request.interface';
import {
  SaveSignatoriesOriginationChecklistDrawDownRequest,
  MarkAmountEnteredMatchesAmountOriginationChecklistDrawDownRequest,
} from './origination-checklist-draw-down-request.commands';
import { OriginationChecklistSectionService } from '../section-shared/origination-checklist-section.service';

export abstract class OriginationChecklistDrawDownRequestRepositoryInterface {
  abstract create(drawDownRequest: CreateOriginationChecklistDrawDownRequestEntity): Promise<number>;
  abstract update(
    FkOriginationChecklistId: number,
    drawDownRequest: UpdateOriginationChecklistDrawDownRequestEntity
  ): Promise<void>;
  abstract get(FkOriginationChecklistId: number): Promise<OriginationChecklistDrawDownRequestEntity>;
}

@Injectable()
export class OriginationChecklistDrawDownRequestService extends OriginationChecklistSectionService {
  protected readonly moduleName = moduleName;

  constructor(
    protected readonly repository: OriginationChecklistDrawDownRequestRepositoryInterface,
    protected readonly originationChecklistService: OriginationChecklistIdentification,
    protected readonly commandBus: CommandBus
  ) {
    super();
  }

  async createDrawDownRequest(FkOriginationChecklistId: number): Promise<number> {
    return this.repository.create({ FkOriginationChecklistId });
  }

  async getDrawDownRequest(FkOriginationChecklistId: number): Promise<OriginationChecklistDrawDownRequest> {
    const drawDownRequestEntity = await this.repository.get(FkOriginationChecklistId);

    return OriginationChecklistDrawDownRequestService.fillDrawDownRequest(drawDownRequestEntity);
  }
  static fillDrawDownRequest(
    drawDownRequestEntity: OriginationChecklistDrawDownRequestEntity
  ): OriginationChecklistDrawDownRequest {
    const sharedComputed = OriginationChecklistSectionService.fillShared(drawDownRequestEntity);

    const drawDownRequest: OriginationChecklistDrawDownRequest = { ...drawDownRequestEntity, ...sharedComputed };

    return drawDownRequest;
  }

  async saveSignatories(
    furtherDrawdownId: number,
    furtherType: string,
    Signatories: string,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      Signatories,
    });
    await this.commandBus.execute(
      new SaveSignatoriesOriginationChecklistDrawDownRequest(
        { FkOriginationChecklistId, content: Signatories },
        context
      )
    );
  }

  async markAmountsEnteredMatchesAmount(
    furtherDrawdownId: number,
    furtherType: string,
    AmountEnteredMatchesAmount: boolean,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      AmountEnteredMatchesAmount,
    });
    await this.commandBus.execute(
      new MarkAmountEnteredMatchesAmountOriginationChecklistDrawDownRequest(
        { FkOriginationChecklistId, content: AmountEnteredMatchesAmount },
        context
      )
    );
  }
}

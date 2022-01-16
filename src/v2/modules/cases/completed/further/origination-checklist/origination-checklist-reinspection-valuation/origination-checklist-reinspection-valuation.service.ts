import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { OriginationChecklistIdentification } from '../origination-checklist.identification';
import {
  CreateOriginationChecklistReinspectionValuationEntity,
  OriginationChecklistReinspectionValuationEntity,
  OriginationChecklistReinspectionValuation,
  UpdateOriginationChecklistReinspectionValuationEntity,
  moduleName,
} from './origination-checklist-reinspection-valuation.interface';
import {
  MarkAddressMatches,
  MarkAddressedToCorrect,
  MarkSignedAndDated,
  MarkValuerOnApproved,
  MarkWithin3Months,
} from './origination-checklist-reinspection-valuation.commands';
import { OriginationChecklistSectionService } from '../section-shared/origination-checklist-section.service';

export abstract class OriginationChecklistReinspectionValuationRepositoryInterface {
  abstract create(reinspectionValuation: CreateOriginationChecklistReinspectionValuationEntity): Promise<number>;
  abstract update(
    FkOriginationChecklistId: number,
    reinspectionValuation: UpdateOriginationChecklistReinspectionValuationEntity
  ): Promise<void>;
  abstract get(FkOriginationChecklistId: number): Promise<OriginationChecklistReinspectionValuationEntity>;
}

@Injectable()
export class OriginationChecklistReinspectionValuationService extends OriginationChecklistSectionService {
  protected readonly moduleName = moduleName;
  constructor(
    protected readonly repository: OriginationChecklistReinspectionValuationRepositoryInterface,
    protected readonly originationChecklistService: OriginationChecklistIdentification,
    protected readonly commandBus: CommandBus
  ) {
    super();
  }

  async createReinspectionValuation(FkOriginationChecklistId: number): Promise<number> {
    return this.repository.create({ FkOriginationChecklistId });
  }

  async getReinspectionValuation(FkOriginationChecklistId: number): Promise<OriginationChecklistReinspectionValuation> {
    const reinspectionValuationEntity = await this.repository.get(FkOriginationChecklistId);

    return OriginationChecklistReinspectionValuationService.fillReinspectionValuation(reinspectionValuationEntity);
  }
  static fillReinspectionValuation(
    reinspectionValuationEntity: OriginationChecklistReinspectionValuationEntity
  ): OriginationChecklistReinspectionValuation {
    const sharedComputed = OriginationChecklistSectionService.fillShared(reinspectionValuationEntity);
    const reinspectionValuation: OriginationChecklistReinspectionValuation = {
      ...reinspectionValuationEntity,
      ...sharedComputed,
    };

    return reinspectionValuation;
  }

  async markAddressMatches(
    furtherDrawdownId: number,
    furtherType: string,
    AddressMatches: boolean,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      AddressMatches,
    });
    await this.commandBus.execute(
      new MarkAddressMatches({ FkOriginationChecklistId, content: AddressMatches }, context)
    );
  }

  async markAddressedToCorrect(
    furtherDrawdownId: number,
    furtherType: string,
    AddressedToCorrect: boolean,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      AddressedToCorrect,
    });
    await this.commandBus.execute(
      new MarkAddressedToCorrect({ FkOriginationChecklistId, content: AddressedToCorrect }, context)
    );
  }

  async markSignedAndDated(
    furtherDrawdownId: number,
    furtherType: string,
    SignedAndDated: boolean,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      SignedAndDated,
    });
    await this.commandBus.execute(
      new MarkSignedAndDated({ FkOriginationChecklistId, content: SignedAndDated }, context)
    );
  }

  async markValuerOnApproved(
    furtherDrawdownId: number,
    furtherType: string,
    ValuerOnApproved: boolean,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      ValuerOnApproved,
    });
    await this.commandBus.execute(
      new MarkValuerOnApproved({ FkOriginationChecklistId, content: ValuerOnApproved }, context)
    );
  }

  async markWithin3Months(
    furtherDrawdownId: number,
    furtherType: string,
    Within3Months: boolean,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      Within3Months,
    });
    await this.commandBus.execute(new MarkWithin3Months({ FkOriginationChecklistId, content: Within3Months }, context));
  }
}

import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import {
  OriginationChecklistSectionComputedFields,
  OriginationChecklistSectionFields,
  CreateOriginationChecklistSectionEntity,
} from './origination-checklist-section.interface';
import { OriginationChecklistIdentification } from '../origination-checklist.identification';
import { Signature } from '../../signature/signature.interface';
import {
  AddPrimarySignatureOriginationChecklist,
  AddSecondarySignatureOriginationChecklist,
} from '../origination-checklist.commands';

export abstract class OriginationChecklistSectionRepositoryInterface {
  abstract create(reinspectionValuation: CreateOriginationChecklistSectionEntity): Promise<number>;
  abstract update(
    FkOriginationChecklistId: number,
    reinspectionValuation: Partial<OriginationChecklistSectionFields>
  ): Promise<void>;
  abstract get(FkOriginationChecklistId: number): Promise<OriginationChecklistSectionFields>;
}

export abstract class OriginationChecklistSectionService {
  protected abstract readonly moduleName: string;
  protected abstract readonly commandBus: CommandBus;
  protected abstract readonly repository: OriginationChecklistSectionRepositoryInterface;
  protected abstract readonly originationChecklistService: OriginationChecklistIdentification;

  static fillShared(entity: OriginationChecklistSectionFields): OriginationChecklistSectionComputedFields {
    const computed: OriginationChecklistSectionComputedFields = {};
    if (entity.PrimarySignatureDate) {
      computed.primarySignature = {
        Date: entity.PrimarySignatureDate,
        User: entity.PrimarySignatureUser,
      };
    }
    if (entity.SecondarySignatureDate) {
      computed.secondarySignature = {
        Date: entity.SecondarySignatureDate,
        User: entity.SecondarySignatureUser,
      };
    }

    return computed;
  }

  async addPrimarySignature(
    furtherDrawdownId: number,
    furtherType: string,
    signature: Signature,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      PrimarySignatureDate: signature.Date,
      PrimarySignatureUser: signature.User,
    });
    await this.commandBus.execute(
      new AddPrimarySignatureOriginationChecklist(
        { FkOriginationChecklistId, content: signature },
        context,
        this.moduleName
      )
    );
  }

  async addSecondarySignature(
    furtherDrawdownId: number,
    furtherType: string,
    signature: Signature,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      SecondarySignatureDate: signature.Date,
      SecondarySignatureUser: signature.User,
    });
    await this.commandBus.execute(
      new AddSecondarySignatureOriginationChecklist(
        { FkOriginationChecklistId, content: signature },
        context,
        this.moduleName
      )
    );
  }
}

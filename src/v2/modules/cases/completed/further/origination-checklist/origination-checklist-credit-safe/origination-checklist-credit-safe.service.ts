import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { OriginationChecklistIdentification } from '../origination-checklist.identification';
import {
  CreateOriginationChecklistCreditSafeEntity,
  OriginationChecklistCreditSafeEntity,
  OriginationChecklistCreditSafe,
  UpdateOriginationChecklistCreditSafeEntity,
  moduleName,
} from './origination-checklist-credit-safe.interface';
import { MarkDirectorsSame, MarkNameMatches, MarkNoCCJ } from './origination-checklist-credit-safe.commands';
import { OriginationChecklistSectionService } from '../section-shared/origination-checklist-section.service';

export abstract class OriginationChecklistCreditSafeRepositoryInterface {
  abstract create(creditSafe: CreateOriginationChecklistCreditSafeEntity): Promise<number>;
  abstract update(
    FkOriginationChecklistId: number,
    creditSafe: UpdateOriginationChecklistCreditSafeEntity
  ): Promise<void>;
  abstract get(FkOriginationChecklistId: number): Promise<OriginationChecklistCreditSafeEntity>;
}

@Injectable()
export class OriginationChecklistCreditSafeService extends OriginationChecklistSectionService {
  protected readonly moduleName = moduleName;

  constructor(
    protected readonly repository: OriginationChecklistCreditSafeRepositoryInterface,
    protected readonly originationChecklistService: OriginationChecklistIdentification,
    protected readonly commandBus: CommandBus
  ) {
    super();
  }

  async createCreditSafe(FkOriginationChecklistId: number): Promise<number> {
    return this.repository.create({ FkOriginationChecklistId });
  }

  async getCreditSafe(FkOriginationChecklistId: number): Promise<OriginationChecklistCreditSafe> {
    const creditSafeEntity = await this.repository.get(FkOriginationChecklistId);

    return OriginationChecklistCreditSafeService.fillCreditSafe(creditSafeEntity);
  }
  static fillCreditSafe(creditSafeEntity: OriginationChecklistCreditSafeEntity): OriginationChecklistCreditSafe {
    const sharedComputed = OriginationChecklistSectionService.fillShared(creditSafeEntity);

    const creditSafe: OriginationChecklistCreditSafe = { ...creditSafeEntity, ...sharedComputed };
    return creditSafe;
  }

  async markNameMatches(
    furtherDrawdownId: number,
    furtherType: string,
    NameMatchesOfferLetter: boolean,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      NameMatchesOfferLetter,
    });
    await this.commandBus.execute(
      new MarkNameMatches({ FkOriginationChecklistId, content: NameMatchesOfferLetter }, context)
    );
  }

  async markDirectorsSame(
    furtherDrawdownId: number,
    furtherType: string,
    DirectorsListedTheSame: boolean,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      DirectorsListedTheSame,
    });
    await this.commandBus.execute(
      new MarkDirectorsSame({ FkOriginationChecklistId, content: DirectorsListedTheSame }, context)
    );
  }

  async markNoCCJ(
    furtherDrawdownId: number,
    furtherType: string,
    EnsureNoCCJ: boolean,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    const FkOriginationChecklistId = await this.originationChecklistService.getId(furtherDrawdownId, furtherType);
    await this.repository.update(FkOriginationChecklistId, {
      EnsureNoCCJ,
    });
    await this.commandBus.execute(new MarkNoCCJ({ FkOriginationChecklistId, content: EnsureNoCCJ }, context));
  }
}

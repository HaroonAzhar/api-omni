import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { CasesIdentificationService } from '../../cases-identification.service';
import { Dip } from '../../dip/dip.interface';
import { DipService } from '../../dip/dip.service';
import { CompletedIdentificationService } from '../completed-identification.service';
import {
  CreateFurtherDrawdown,
  CreateFurtherDrawdownEntity,
  FurtherDrawdown,
  FurtherDrawdownEntity,
} from './further-drawdown.interface';
import { CreateFurtherDrawdownCommand } from './further-drawdowns.commands';
import { OriginationChecklistService } from '../further/origination-checklist/origination-checklist.service';
import { UnderwriterFlowService } from '../further/underwriter-flow/underwriter-flow.service';

export abstract class FurtherDrawdownsRepositoryInterface {
  abstract create(furtherDrawdown: CreateFurtherDrawdownEntity): Promise<number>;
  abstract findAll(FkCompletedId: number): Promise<FurtherDrawdownEntity[]>;
  abstract get(FkCompletedId: number, FurtherDrawdownId: number): Promise<FurtherDrawdownEntity>;
}

@Injectable()
export class FurtherDrawdownsService {
  constructor(
    private readonly furtherDrawdownRepository: FurtherDrawdownsRepositoryInterface,
    private readonly completedService: CompletedIdentificationService,
    private readonly originationChecklistService: OriginationChecklistService,
    private readonly underwriterFlowService: UnderwriterFlowService,
    private readonly dipService: DipService,
    private readonly caseIdentification: CasesIdentificationService,
    private readonly commandBus: CommandBus
  ) {}

  private async getCompletedId(caseUuid: string): Promise<number> {
    return await this.completedService.getIdByCaseUuid(caseUuid);
  }

  async createFurtherDrawdown(
    caseUuid: string,
    furtherDrawdown: CreateFurtherDrawdown,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<number> {
    const FkCompletedId = await this.getCompletedId(caseUuid);

    const createdFurtherDrawdown: CreateFurtherDrawdownEntity = { FkCompletedId, ...furtherDrawdown };

    const createdId = await this.furtherDrawdownRepository.create(createdFurtherDrawdown);

    await this.originationChecklistService.createOriginationChecklist(createdId, 'furtherDrawdowns');
    await this.underwriterFlowService.createUnderwriterFlow(createdId, 'furtherDrawdowns');

    const filledFurtherDrawdown = (await this.getFurtherDrawdowns(caseUuid)).find(
      (existingFurtherDrawdown) => existingFurtherDrawdown.FurtherDrawdownId === createdId
    );
    await this.commandBus.execute(new CreateFurtherDrawdownCommand(filledFurtherDrawdown, context));
    return createdId;
  }

  async fillFurtherDrawdown(
    furtherDrawdownEntity: FurtherDrawdownEntity,
    futherDrawdowns: FurtherDrawdownEntity[],
    dip: Dip
  ): Promise<FurtherDrawdown> {
    const originationChecklist = await this.originationChecklistService.getOriginationChecklist(
      furtherDrawdownEntity.FurtherDrawdownId,
      'furtherDrawdowns'
    );
    const underwriterFlow = await this.underwriterFlowService.getUnderwriterFlow(
      furtherDrawdownEntity.FurtherDrawdownId,
      'furtherDrawdowns'
    );

    const remainingFunds = FurtherDrawdownsService.getAvailableDrawdownFunds(futherDrawdowns as FurtherDrawdown[], dip);
    return {
      ...furtherDrawdownEntity,
      remainingFunds,
      originationChecklist,
      underwriterFlow,
    };
  }
  async getFurtherDrawdowns(caseUuid: string): Promise<FurtherDrawdown[]> {
    const CompletedId = await this.getCompletedId(caseUuid);

    const { CaseId } = await this.caseIdentification.getByCaseUuid(caseUuid);
    const dip = await this.dipService.getByCaseId(CaseId);

    return this.getForCompletedId(CompletedId, dip);
  }

  async getForCompletedId(CompletedId: number, dip: Dip): Promise<FurtherDrawdown[]> {
    const furtherDrawdowns = await this.furtherDrawdownRepository.findAll(CompletedId);

    return Promise.all(
      furtherDrawdowns.map((furtherDrawdown, index) =>
        this.fillFurtherDrawdown(furtherDrawdown, furtherDrawdowns.slice(0, index + 1), dip)
      )
    );
  }

  static getAvailableDrawdownFunds(furtherDrawdowns: FurtherDrawdown[] = [], dip?: Dip): number {
    const drownAmount = furtherDrawdowns.reduce((total, furtherDrawdown) => total + furtherDrawdown.RequestedAmount, 0);
    if (dip === undefined) {
      return 0;
    }
    return dip.FurtherDrawDowns - drownAmount;
  }
}

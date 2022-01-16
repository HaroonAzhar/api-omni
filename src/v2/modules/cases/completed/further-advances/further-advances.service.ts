import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { CompletedIdentificationService } from '../completed-identification.service';
import {
  CreateFurtherAdvance,
  CreateFurtherAdvanceEntity,
  FurtherAdvance,
  FurtherAdvanceEntity,
} from './further-advance.interface';
import { CreateFurtherAdvanceCommand } from './further-advances.commands';
import { OriginationChecklistService } from '../further/origination-checklist/origination-checklist.service';
import { UnderwriterFlowService } from '../further/underwriter-flow/underwriter-flow.service';

export abstract class FurtherAdvancesRepositoryInterface {
  abstract create(furtherAdvance: CreateFurtherAdvanceEntity): Promise<number>;
  abstract findAll(FkCompletedId: number): Promise<FurtherAdvanceEntity[]>;
  abstract get(FkCompletedId: number, FurtherAdvanceId: number): Promise<FurtherAdvanceEntity>;
}

@Injectable()
export class FurtherAdvancesService {
  constructor(
    private readonly furtherAdvanceRepository: FurtherAdvancesRepositoryInterface,
    private readonly completedService: CompletedIdentificationService,
    private readonly originationChecklistService: OriginationChecklistService,
    private readonly underwriterFlowService: UnderwriterFlowService,
    private readonly commandBus: CommandBus
  ) {}

  private async getCompletedId(caseUuid: string): Promise<number> {
    return await this.completedService.getIdByCaseUuid(caseUuid);
  }

  async createFurtherAdvance(
    caseUuid: string,
    furtherAdvance: CreateFurtherAdvance,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<number> {
    const FkCompletedId = await this.getCompletedId(caseUuid);

    const createdFurtherAdvance: CreateFurtherAdvanceEntity = { FkCompletedId, ...furtherAdvance };

    const createdId = await this.furtherAdvanceRepository.create(createdFurtherAdvance);

    await this.originationChecklistService.createOriginationChecklist(createdId, 'furtherAdvances');
    await this.underwriterFlowService.createUnderwriterFlow(createdId, 'furtherAdvances');

    const filledFurtherAdvance = (await this.getFurtherAdvances(caseUuid)).find(
      (existingFurtherAdvance) => existingFurtherAdvance.FurtherAdvanceId === createdId
    );
    await this.commandBus.execute(new CreateFurtherAdvanceCommand(filledFurtherAdvance, context));
    return createdId;
  }

  async fillFurtherAdvance(furtherAdvanceEntity: FurtherAdvanceEntity): Promise<FurtherAdvance> {
    const originationChecklist = await this.originationChecklistService.getOriginationChecklist(
      furtherAdvanceEntity.FurtherAdvanceId,
      'furtherAdvances'
    );
    const underwriterFlow = await this.underwriterFlowService.getUnderwriterFlow(
      furtherAdvanceEntity.FurtherAdvanceId,
      'furtherAdvances'
    );

    return {
      ...furtherAdvanceEntity,
      originationChecklist,
      underwriterFlow,
    };
  }
  async getFurtherAdvances(caseUuid: string): Promise<FurtherAdvance[]> {
    const CompletedId = await this.getCompletedId(caseUuid);

    return this.getForCompletedId(CompletedId);
  }

  async getForCompletedId(CompletedId: number): Promise<FurtherAdvance[]> {
    const furtherAdvances = await this.furtherAdvanceRepository.findAll(CompletedId);

    return Promise.all(furtherAdvances.map((furtherAdvance) => this.fillFurtherAdvance(furtherAdvance)));
  }
}

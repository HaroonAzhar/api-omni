import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import {
  UnderwriterFlow,
  UnderwriterFlowRepositoryInterface,
  UpdateUnderwriterFlowEntity,
} from './underwriter-flow.interface';
import { UpdateUnderwriterFlow, ReturnUnderwriterFlow, ApproveUnderwriterFlow } from './underwriter-flow.commands';
import { Signature, SignatureWithComment } from '../signature/signature.interface';

@Injectable()
export class UnderwriterFlowService {
  constructor(
    private readonly underwriterFlowRepository: UnderwriterFlowRepositoryInterface,
    private readonly commandBus: CommandBus
  ) {}

  async createUnderwriterFlow(FkFurtherId: number, FurtherType: string): Promise<number> {
    const createdId = await this.underwriterFlowRepository.create({ FkFurtherId, FurtherType });
    return createdId;
  }

  async getUnderwriterFlow(FkFurtherId: number, FurtherType: string): Promise<UnderwriterFlow> {
    const entity = await this.underwriterFlowRepository.get(FkFurtherId, FurtherType);

    return entity;
  }

  async changeUnderwriterFlow(
    FkFurtherId: number,
    FurtherType: string,
    key: keyof UpdateUnderwriterFlowEntity,
    value: UpdateUnderwriterFlowEntity[keyof UpdateUnderwriterFlowEntity],
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    await this.underwriterFlowRepository.update(FkFurtherId, FurtherType, {
      [key]: value,
    });
    await this.commandBus.execute(
      new UpdateUnderwriterFlow({ FkFurtherId, FurtherType, content: { [key]: value } }, context)
    );
  }

  async returnUnderwriterFlow(
    FkFurtherId: number,
    FurtherType: string,
    signature: SignatureWithComment,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    await this.underwriterFlowRepository.update(FkFurtherId, FurtherType, {
      ReturnDate: signature.Date,
      ReturnComment: signature.Comment,
    });
    await this.commandBus.execute(new ReturnUnderwriterFlow({ FkFurtherId, FurtherType, content: signature }, context));
  }

  async approveUnderwriterFlow(
    FkFurtherId: number,
    FurtherType: string,
    signature: Signature,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    await this.underwriterFlowRepository.update(FkFurtherId, FurtherType, {
      UnderwriterApprovalDate: signature.Date,
    });
    await this.commandBus.execute(
      new ApproveUnderwriterFlow({ FkFurtherId, FurtherType, content: signature }, context)
    );
  }
  async changeAssessmentOfExitViability(
    FkFurtherId: number,
    FurtherType: string,
    AssessmentOfExitViability: string,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    await this.underwriterFlowRepository.update(FkFurtherId, FurtherType, {
      AssessmentOfExitViability,
    });
    await this.commandBus.execute(
      new UpdateUnderwriterFlow({ FkFurtherId, FurtherType, content: { AssessmentOfExitViability } }, context)
    );
  }

  async changeDescriptionOfWorks(
    FkFurtherId: number,
    FurtherType: string,
    DescriptionOfWorks: string,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    await this.underwriterFlowRepository.update(FkFurtherId, FurtherType, {
      DescriptionOfWorks,
    });
    await this.commandBus.execute(
      new UpdateUnderwriterFlow({ FkFurtherId, FurtherType, content: { DescriptionOfWorks } }, context)
    );
  }

  async changeAssessmentOfProgress(
    FkFurtherId: number,
    FurtherType: string,
    AssessmentOfProgress: string,
    context: CommandContext = { Trigger: '', User: '' }
  ): Promise<void> {
    await this.underwriterFlowRepository.update(FkFurtherId, FurtherType, {
      AssessmentOfProgress,
    });
    await this.commandBus.execute(
      new UpdateUnderwriterFlow({ FkFurtherId, FurtherType, content: { AssessmentOfProgress } }, context)
    );
  }
}

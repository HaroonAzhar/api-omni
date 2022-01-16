import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { adjustmentCancellationCorrection } from '../adjustment.interface';
import {
  AdjustmentCorrection,
  SaveAdjustmentCorrection,
  CreateAdjustmentCorrection,
} from './adjustment-correction.interface';
import { CreateAdjustmentCorrectionCommand } from './adjustment-corrections.commands';

export abstract class AdjustmentCorrectionsRepositoryInterface {
  abstract create(adjustmentCorrection: SaveAdjustmentCorrection): Promise<number>;
  abstract findAll(FkAdjustmentId: number): Promise<AdjustmentCorrection[]>;
}

@Injectable()
export class AdjustmentCorrectionsService {
  constructor(
    private readonly adjustmentCorrectionRepository: AdjustmentCorrectionsRepositoryInterface,
    private readonly commandBus: CommandBus
  ) {}

  async createAdjustmentCorrection(
    FkAdjustmentId: number,
    adjustmentCorrection: CreateAdjustmentCorrection,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<number> {
    const createdAdjustmentCorrection = { FkAdjustmentId, ...adjustmentCorrection };

    await this.cancelLastCorrection(FkAdjustmentId, context, 'replaced with correction');
    return this.saveCorrection(createdAdjustmentCorrection, context);
  }

  private async saveCorrection(adjustmentCorrection: SaveAdjustmentCorrection, context: CommandContext) {
    const createdId = await this.adjustmentCorrectionRepository.create(adjustmentCorrection);
    const savedAdjustmentCorrection = { ...adjustmentCorrection, AdjustmentCorrectionId: createdId };
    await this.commandBus.execute(new CreateAdjustmentCorrectionCommand(savedAdjustmentCorrection, context));
    return createdId;
  }

  async cancelLastCorrection(
    FkAdjustmentId: number,
    context: CommandContext = { Trigger: '', User: '', Module: '' },
    description: string = ''
  ): Promise<void> {
    const corrections = await this.getAdjustmentCorrections(FkAdjustmentId);

    const lastCorrection = corrections[corrections.length - 1];

    if (lastCorrection && lastCorrection.Description.indexOf(adjustmentCancellationCorrection) === -1) {
      const cancellationCorrection = {
        CorrectedAmount: -lastCorrection.CorrectedAmount,
        CreatedBy: context.User,
        Description: `${adjustmentCancellationCorrection} ${description}`,
        FkAdjustmentId: FkAdjustmentId,
      };
      await this.saveCorrection(cancellationCorrection, context);
    }
  }

  async getAdjustmentCorrections(FkAdjustmentId: number): Promise<AdjustmentCorrection[]> {
    return this.adjustmentCorrectionRepository.findAll(FkAdjustmentId);
  }
}

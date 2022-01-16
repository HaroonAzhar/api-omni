import { Injectable } from '@nestjs/common';
import { CommandContext } from '@v2/utils/commands';

import { CompletedIdentificationService } from '../completed-identification.service';
import { AdjustmentCorrectionsService } from './adjustment-corrections/adjustment-corrections.service';
import {
  Adjustment,
  AdjustmentsFilterQuery,
  AdjustmentWithCorrections,
  adjustmentInitialCorrection,
  CreateAdjustment,
  SaveAdjustment,
} from './adjustment.interface';

export abstract class AdjustmentsRepositoryInterface {
  abstract create(adjustment: SaveAdjustment): Promise<number>;
  abstract findAll(
    FkCompletedId: number,
    query?: AdjustmentsFilterQuery
  ): Promise<(Adjustment & { AdjustmentId: number })[]>;

  abstract findFiltered(query?: AdjustmentsFilterQuery): Promise<(Adjustment & { AdjustmentId: number })[]>;
}

@Injectable()
export class AdjustmentsService {
  constructor(
    private readonly adjustmentRepository: AdjustmentsRepositoryInterface,
    private readonly completedService: CompletedIdentificationService,
    private readonly adjustmentCorrectionsService: AdjustmentCorrectionsService
  ) {}

  private async getCompletedId(caseUuid: string): Promise<number> {
    return await this.completedService.getIdByCaseUuid(caseUuid);
  }

  async createAdjustment(
    caseUuid: string,
    adjustment: CreateAdjustment,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<number> {
    const FkCompletedId = await this.getCompletedId(caseUuid);

    const { Amount, ...rest } = adjustment;

    const adjustmentId = await this.adjustmentRepository.create({ FkCompletedId, ...rest });

    await this.adjustmentCorrectionsService.createAdjustmentCorrection(adjustmentId, {
      CorrectedAmount: Amount,
      Description: adjustmentInitialCorrection,
      CreatedBy: context.User,
    });
    return adjustmentId;
  }

  async getForCompletedId(CompletedId: number, query?: AdjustmentsFilterQuery): Promise<AdjustmentWithCorrections[]> {
    const adjustments = await this.adjustmentRepository.findAll(CompletedId, query);

    const adjustmentsWithCorrections = Promise.all(
      adjustments.map((adjustment) => this.getAdjustmentWithCorrections(adjustment))
    );
    return adjustmentsWithCorrections;
  }

  async getAdjustments(caseUuid: string, query?: AdjustmentsFilterQuery): Promise<AdjustmentWithCorrections[]> {
    const CompletedId = await this.getCompletedId(caseUuid);

    return this.getForCompletedId(CompletedId, query);
  }

  private async getAdjustmentWithCorrections(
    adjustment: Adjustment & { AdjustmentId: number }
  ): Promise<AdjustmentWithCorrections> {
    const corrections = await this.adjustmentCorrectionsService.getAdjustmentCorrections(adjustment.AdjustmentId);

    const correctedAdjustment: AdjustmentWithCorrections = {
      ...adjustment,
      corrections,
    };

    correctedAdjustment.amount = correctedAdjustment.corrections.reduce(
      (sum, correction) => sum + correction.CorrectedAmount,
      0
    );

    return correctedAdjustment;
  }

  async cancelAdjustment(
    adjustmentId: number,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    await this.adjustmentCorrectionsService.cancelLastCorrection(adjustmentId, context);
  }

  private async getAdjustmentsWithCorrections(adjustments: Adjustment[]): Promise<AdjustmentWithCorrections[]> {
    const adjustmentsWithCorrections = Promise.all(
      adjustments.map((adjustment) =>
        this.getAdjustmentWithCorrections(adjustment as Adjustment & { AdjustmentId: number })
      )
    );
    return adjustmentsWithCorrections;
  }
  async getForDatesAndType(query: AdjustmentsFilterQuery): Promise<AdjustmentWithCorrections[]> {
    const adjustments = await this.adjustmentRepository.findFiltered(query);

    return this.getAdjustmentsWithCorrections(adjustments);
  }
}

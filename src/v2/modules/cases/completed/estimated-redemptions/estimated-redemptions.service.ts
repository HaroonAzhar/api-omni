import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';
import moment from 'moment';

import { CompletedIdentificationService } from '../completed-identification.service';
import { SecuritiesService } from '../securities/securities.service';
import {
  CreateEstimatedRedemption,
  CreateEstimatedRedemptionEntity,
  EstimatedRedemption,
  EstimatedRedemptionEntity,
  UpdateEstimatedRedemption,
  UpdateEstimatedRedemptionEntity,
} from './estimated-redemption.interface';
import {
  CreateEstimatedRedemptionCommand,
  DeleteEstimatedRedemptionCommand,
  UpdateEstimatedRedemptionCommand,
} from './estimated-redemptions.commands';

export abstract class EstimatedRedemptionsRepositoryInterface {
  abstract create(estimatedRedemption: CreateEstimatedRedemptionEntity): Promise<number>;
  abstract update(estimatedRedemption: UpdateEstimatedRedemptionEntity): Promise<void>;

  abstract findAll(FkCompletedId: number): Promise<EstimatedRedemptionEntity[]>;
  abstract get(FkCompletedId: number, EstimatedRedemptionId: number): Promise<EstimatedRedemptionEntity>;
  abstract findForDates(dateMin: string, dateMax: string): Promise<EstimatedRedemptionEntity[]>;

  abstract delete(FkCompletedId: number, EstimatedRedemptionId: number): Promise<void>;
}

@Injectable()
export class EstimatedRedemptionsService {
  constructor(
    private readonly estimatedRedemptionRepository: EstimatedRedemptionsRepositoryInterface,
    private readonly completedService: CompletedIdentificationService,
    private readonly securitiesService: SecuritiesService,
    private readonly commandBus: CommandBus
  ) {}

  private async getCompletedId(caseUuid: string): Promise<number> {
    return await this.completedService.getIdByCaseUuid(caseUuid);
  }

  async createEstimatedRedemption(
    caseUuid: string,
    estimatedRedemption: CreateEstimatedRedemption,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<number> {
    const FkCompletedId = await this.getCompletedId(caseUuid);
    const existingEstimatedRedemptions = await this.getForCompletedId(FkCompletedId);
    if (!EstimatedRedemptionsService.canCreateEstimatedRedemption(estimatedRedemption, existingEstimatedRedemptions)) {
      return;
    }
    return this.create(FkCompletedId, estimatedRedemption, context);
  }

  private static isDateBeforeToday(estimatedRedemption: { Date?: string }): boolean {
    return moment(estimatedRedemption.Date).isBefore(moment(), 'day');
  }

  static lastRemainder(existingEstimatedRedemptions: { Date?: string }[]): { Date?: string } {
    return existingEstimatedRedemptions[existingEstimatedRedemptions.length - 1];
  }
  private static isAfterRemainder(
    estimatedRedemption: { Date?: string },
    existingEstimatedRedemptions: { Date?: string }[],
    EstimatedRedemptionId?: number
  ): boolean {
    if (existingEstimatedRedemptions.length === 0) {
      return false;
    }
    const lastRemainder = EstimatedRedemptionsService.lastRemainder(
      existingEstimatedRedemptions
    ) as EstimatedRedemption;
    if (lastRemainder.EstimatedRedemptionId === EstimatedRedemptionId) {
      return false;
    }
    return moment(estimatedRedemption.Date).isAfter(moment(lastRemainder?.Date), 'day');
  }
  static canCreateEstimatedRedemption(
    estimatedRedemption: CreateEstimatedRedemption,
    existingEstimatedRedemptions: EstimatedRedemption[]
  ): boolean {
    if (EstimatedRedemptionsService.isDateBeforeToday(estimatedRedemption)) {
      return false;
    }
    if (EstimatedRedemptionsService.isAfterRemainder(estimatedRedemption, existingEstimatedRedemptions)) {
      return false;
    }
    return true;
  }

  async create(
    FkCompletedId: number,
    estimatedRedemption: CreateEstimatedRedemption,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<number> {
    const createdEstimatedRedemption: CreateEstimatedRedemptionEntity = { FkCompletedId, ...estimatedRedemption };

    const EstimatedRedemptionId = await this.estimatedRedemptionRepository.create(createdEstimatedRedemption);

    const created = await this.estimatedRedemptionRepository.get(FkCompletedId, EstimatedRedemptionId);
    await this.commandBus.execute(new CreateEstimatedRedemptionCommand(created, context));
    return EstimatedRedemptionId;
  }

  private static isDateUnChanged(
    estimatedRedemption: UpdateEstimatedRedemption,
    existingEstimatedRedemptions: EstimatedRedemption[],
    EstimatedRedemptionId: number
  ): boolean {
    const [previous] = existingEstimatedRedemptions.filter(
      (candidate) => candidate.EstimatedRedemptionId === EstimatedRedemptionId
    );
    return (
      moment(previous?.Date).format(moment.HTML5_FMT.DATE) ===
      moment(estimatedRedemption.Date).format(moment.HTML5_FMT.DATE)
    );
  }

  private static isNotRemainderModified(
    EstimatedRedemptionId: number,
    existingEstimatedRedemptions: EstimatedRedemption[]
  ): boolean {
    const remainder = EstimatedRedemptionsService.lastRemainder(existingEstimatedRedemptions) as EstimatedRedemption;
    return !(EstimatedRedemptionId === remainder.EstimatedRedemptionId);
  }
  private static isRemainderDateSetBeforeExisting(
    estimatedRedemption: UpdateEstimatedRedemption,
    EstimatedRedemptionId: number,
    existingEstimatedRedemptions: EstimatedRedemption[]
  ): boolean {
    if (EstimatedRedemptionsService.isNotRemainderModified(EstimatedRedemptionId, existingEstimatedRedemptions)) {
      return false;
    }

    const otherRedemptions = existingEstimatedRedemptions.slice(0, -1);

    const newRemainderDate = moment(estimatedRedemption.Date);

    return otherRedemptions.some((otherRedemption) => moment(newRemainderDate).isBefore(otherRedemption.Date, 'day'));
  }
  static canUpdateEstimatedRedemption(
    estimatedRedemption: UpdateEstimatedRedemption,
    EstimatedRedemptionId: number,
    existingEstimatedRedemptions: EstimatedRedemption[]
  ): boolean {
    if (
      EstimatedRedemptionsService.isDateUnChanged(
        estimatedRedemption,
        existingEstimatedRedemptions,
        EstimatedRedemptionId
      )
    ) {
      return true;
    }
    if (EstimatedRedemptionsService.isDateBeforeToday(estimatedRedemption)) {
      return false;
    }
    if (
      EstimatedRedemptionsService.isAfterRemainder(
        estimatedRedemption,
        existingEstimatedRedemptions,
        EstimatedRedemptionId
      )
    ) {
      return false;
    }

    if (
      EstimatedRedemptionsService.isRemainderDateSetBeforeExisting(
        estimatedRedemption,
        EstimatedRedemptionId,
        existingEstimatedRedemptions
      )
    ) {
      return false;
    }

    return true;
  }
  async updateEstimatedRedemption(
    caseUuid: string,
    estimatedRedemption: UpdateEstimatedRedemption,
    EstimatedRedemptionId: number,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    const FkCompletedId = await this.getCompletedId(caseUuid);
    const existingEstimatedRedemptions = await this.getForCompletedId(FkCompletedId);
    if (
      !EstimatedRedemptionsService.canUpdateEstimatedRedemption(
        estimatedRedemption,
        EstimatedRedemptionId,
        existingEstimatedRedemptions
      )
    ) {
      return;
    }
    return this.update(FkCompletedId, estimatedRedemption, EstimatedRedemptionId, context);
  }

  async update(
    FkCompletedId: number,
    estimatedRedemption: UpdateEstimatedRedemption,
    EstimatedRedemptionId: number,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    await this.estimatedRedemptionRepository.update({ ...estimatedRedemption, FkCompletedId, EstimatedRedemptionId });

    await this.commandBus.execute(new UpdateEstimatedRedemptionCommand(estimatedRedemption, context));
  }

  async deleteEstimatedRedemption(
    caseUuid: string,
    EstimatedRedemptionId: number,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    const FkCompletedId = await this.getCompletedId(caseUuid);

    await this.estimatedRedemptionRepository.delete(FkCompletedId, EstimatedRedemptionId);

    await this.commandBus.execute(new DeleteEstimatedRedemptionCommand({ EstimatedRedemptionId }, context));
  }

  async getEstimatedRedemptions(caseUuid: string): Promise<EstimatedRedemption[]> {
    const CompletedId = await this.getCompletedId(caseUuid);

    return this.getForCompletedId(CompletedId);
  }

  async getForCompletedId(CompletedId: number): Promise<EstimatedRedemption[]> {
    const estimatedRedemptions = await this.estimatedRedemptionRepository.findAll(CompletedId);

    return Promise.all(
      estimatedRedemptions.map(async (estimatedRedemption) => {
        const security = await this.securitiesService.getSecurity(estimatedRedemption.FkSecurityId);

        return {
          ...estimatedRedemption,
          security,
        };
      })
    );
  }

  async getForDates(dateMin: string, dateMax: string): Promise<EstimatedRedemption[]> {
    const estimatedRedemptions = await this.estimatedRedemptionRepository.findForDates(dateMin, dateMax);

    return estimatedRedemptions;
  }
}

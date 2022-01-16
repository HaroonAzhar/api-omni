import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { CompletedIdentificationService } from '../completed-identification.service';
import {
  CreateExpectedDrawdown,
  CreateExpectedDrawdownEntity,
  ExpectedDrawdown,
  ExpectedDrawdownEntity,
  UpdateExpectedDrawdown,
  UpdateExpectedDrawdownEntity,
} from './expected-drawdown.interface';
import {
  CreateExpectedDrawdownCommand,
  DeleteExpectedDrawdownCommand,
  UpdateExpectedDrawdownCommand,
} from './expected-drawdowns.commands';

export abstract class ExpectedDrawdownsRepositoryInterface {
  abstract create(expectedDrawdown: CreateExpectedDrawdownEntity): Promise<number>;
  abstract update(expectedDrawdown: UpdateExpectedDrawdownEntity): Promise<void>;

  abstract findAll(FkCompletedId: number): Promise<ExpectedDrawdownEntity[]>;
  abstract get(FkCompletedId: number, ExpectedDrawdownId: number): Promise<ExpectedDrawdownEntity>;
  abstract findForDates(dateMin: string, dateMax: string): Promise<ExpectedDrawdownEntity[]>;

  abstract delete(FkCompletedId: number, ExpectedDrawdownId: number): Promise<void>;
}

@Injectable()
export class ExpectedDrawdownsService {
  constructor(
    private readonly expectedDrawdownRepository: ExpectedDrawdownsRepositoryInterface,
    private readonly completedService: CompletedIdentificationService,
    private readonly commandBus: CommandBus
  ) {}

  private async getCompletedId(caseUuid: string): Promise<number> {
    return await this.completedService.getIdByCaseUuid(caseUuid);
  }

  async createExpectedDrawdown(
    caseUuid: string,
    expectedDrawdown: CreateExpectedDrawdown,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<number> {
    const FkCompletedId = await this.getCompletedId(caseUuid);
    return this.create(FkCompletedId, expectedDrawdown, context);
  }

  async create(
    FkCompletedId: number,
    expectedDrawdown: CreateExpectedDrawdown,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<number> {
    const createdExpectedDrawdown: CreateExpectedDrawdownEntity = { FkCompletedId, ...expectedDrawdown };

    const ExpectedDrawdownId = await this.expectedDrawdownRepository.create(createdExpectedDrawdown);

    const created = await this.expectedDrawdownRepository.get(FkCompletedId, ExpectedDrawdownId);
    await this.commandBus.execute(new CreateExpectedDrawdownCommand(created, context));
    return ExpectedDrawdownId;
  }

  async updateExpectedDrawdown(
    caseUuid: string,
    expectedDrawdown: UpdateExpectedDrawdown,
    ExpectedDrawdownId: number,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    const FkCompletedId = await this.getCompletedId(caseUuid);

    await this.expectedDrawdownRepository.update({ ...expectedDrawdown, FkCompletedId, ExpectedDrawdownId });

    await this.commandBus.execute(new UpdateExpectedDrawdownCommand(expectedDrawdown, context));
  }

  async deleteExpectedDrawdown(
    caseUuid: string,
    ExpectedDrawdownId: number,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    const FkCompletedId = await this.getCompletedId(caseUuid);

    await this.expectedDrawdownRepository.delete(FkCompletedId, ExpectedDrawdownId);

    await this.commandBus.execute(new DeleteExpectedDrawdownCommand({ ExpectedDrawdownId }, context));
  }

  async getExpectedDrawdowns(caseUuid: string): Promise<ExpectedDrawdown[]> {
    const CompletedId = await this.getCompletedId(caseUuid);

    return this.getForCompletedId(CompletedId);
  }

  async getForCompletedId(CompletedId: number): Promise<ExpectedDrawdown[]> {
    const expectedDrawdowns = await this.expectedDrawdownRepository.findAll(CompletedId);

    return expectedDrawdowns;
  }

  async getForDates(dateMin: string, dateMax: string): Promise<ExpectedDrawdown[]> {
    const expectedDrawdowns = await this.expectedDrawdownRepository.findForDates(dateMin, dateMax);

    return expectedDrawdowns;
  }
}

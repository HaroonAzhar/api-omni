import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import { CompletedIdentificationService } from '../completed-identification.service';
import { Cashflow, CashflowsFilterQuery } from './cashflow.interface';
import { CreateCashflowCommand } from './cashflows.commands';

export abstract class CashflowsRepositoryInterface {
  abstract create(cashflow: Cashflow): Promise<number>;
  abstract findAll(FkCompletedId: number, query?: CashflowsFilterQuery): Promise<Cashflow[]>;
}

@Injectable()
export class CashflowsService {
  constructor(
    private readonly cashflowRepository: CashflowsRepositoryInterface,
    private readonly completedService: CompletedIdentificationService,
    private readonly commandBus: CommandBus
  ) {}

  private async getCompletedId(caseUuid: string): Promise<number> {
    return await this.completedService.getIdByCaseUuid(caseUuid);
  }

  async createCashflow(
    caseUuid: string,
    cashflow: Cashflow & { CreatedBy: string },
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<number> {
    const FkCompletedId = await this.getCompletedId(caseUuid);

    const createdCashflow = { FkCompletedId, ...cashflow };

    const createdId = await this.cashflowRepository.create(createdCashflow);
    createdCashflow.CashflowId = createdId;
    await this.commandBus.execute(new CreateCashflowCommand(createdCashflow, context));
    return createdId;
  }

  async getForCompletedId(CompletedId: number, query?: CashflowsFilterQuery): Promise<Cashflow[]> {
    return this.cashflowRepository.findAll(CompletedId, query);
  }

  async getCashflows(caseUuid: string, query?: CashflowsFilterQuery): Promise<Cashflow[]> {
    const CompletedId = await this.getCompletedId(caseUuid);

    return this.getForCompletedId(CompletedId, query);
  }
}

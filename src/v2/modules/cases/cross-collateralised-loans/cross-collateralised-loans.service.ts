import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CommandContext } from '@v2/utils/commands';

import {
  CreateCrossCollateralisedLoan,
  CreateCrossCollateralisedLoanEntity,
  CrossCollateralisedLoan,
  CrossCollateralisedLoanEntity,
} from './cross-collateralised-loan.interface';
import {
  CreateCrossCollateralisedLoanCommand,
  DeleteCrossCollateralisedLoanCommand,
} from './cross-collateralised-loan.commands';
import { CasesIdentificationService } from '../cases-identification.service';
import { CompletedService } from '../completed/completed.service';

export abstract class CrossCollateralisedLoansRepositoryInterface {
  abstract create(CrossCollateralisedLoan: CreateCrossCollateralisedLoanEntity): Promise<number>;

  abstract findAll(FkCaseId: number): Promise<CrossCollateralisedLoanEntity[]>;

  abstract get(CrossCollateralisedLoanId: number): Promise<CrossCollateralisedLoanEntity>;

  abstract delete(FkCaseId: number, FkOtherCaseId: number): Promise<void>;
}

@Injectable()
export class CrossCollateralisedLoansService {
  constructor(
    private readonly crossCollateralisedLoanRepository: CrossCollateralisedLoansRepositoryInterface,
    private readonly casesService: CasesIdentificationService,
    private readonly completedService: CompletedService,
    private readonly commandBus: CommandBus
  ) {}

  private async getCaseId(caseUuid: string): Promise<number> {
    const { CaseId } = await this.casesService.getByCaseUuid(caseUuid);
    return CaseId;
  }

  async createCrossCollateralisedLoan(
    caseUuid: string,
    crossCollateralisedLoan: CreateCrossCollateralisedLoan,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<number> {
    const FkCaseId = await this.getCaseId(caseUuid);
    const FkOtherCaseId = await this.getCaseId(crossCollateralisedLoan.otherCaseUuid);

    const createdCrossCollateralisedLoan: CreateCrossCollateralisedLoanEntity = {
      FkCaseId,
      FkOtherCaseId: FkOtherCaseId,
      CreatedBy: context.User,
    };

    const crossCollateralisedLoanId = await this.crossCollateralisedLoanRepository.create(
      createdCrossCollateralisedLoan
    );

    const created = await this.crossCollateralisedLoanRepository.get(crossCollateralisedLoanId);
    await this.commandBus.execute(new CreateCrossCollateralisedLoanCommand(created, context));
    return crossCollateralisedLoanId;
  }

  async deleteCrossCollateralisedLoan(
    caseUuid: string,
    otherCaseUuid: string,
    context: CommandContext = { Trigger: '', User: '', Module: '' }
  ): Promise<void> {
    const FkCaseId = await this.getCaseId(caseUuid);
    const FkOtherCaseId = await this.getCaseId(otherCaseUuid);

    await this.crossCollateralisedLoanRepository.delete(FkCaseId, FkOtherCaseId);

    await this.commandBus.execute(new DeleteCrossCollateralisedLoanCommand({ caseUuid, otherCaseUuid }, context));
  }

  async getCrossCollateralisedLoans(caseUuid: string): Promise<CrossCollateralisedLoan[]> {
    const FkCaseId = await this.getCaseId(caseUuid);

    return this.getForCaseId(FkCaseId);
  }

  async getForCaseId(FkCaseId: number): Promise<CrossCollateralisedLoan[]> {
    const crossCollateralisedLoans = await this.crossCollateralisedLoanRepository.findAll(FkCaseId);

    const loans = await Promise.all(
      crossCollateralisedLoans.map(async (crossCollateralisedLoan) => {
        const otherId =
          crossCollateralisedLoan.FkCaseId === FkCaseId
            ? crossCollateralisedLoan.FkOtherCaseId
            : crossCollateralisedLoan.FkCaseId;
        const { Id: caseUuid, Stage: stage, CaseNr: caseRef } = await this.casesService.getByCaseId(otherId);

        const completed = await this.completedService.getByCaseUuid(caseUuid);

        return {
          ...crossCollateralisedLoan,
          caseUuid,
          stage,
          caseRef,
          status: completed?.status,
        };
      })
    );
    const completedLoans = loans.filter(({ stage }) => stage === 'completed' || stage === 'redeemed');

    return completedLoans;
  }
}

import { Injectable } from '@nestjs/common';
import { UnderwritersService } from '@v2/modules/admin/underwriters/underwriters.service';

import { CasesIdentificationService } from '../cases-identification.service';
import { DipService } from '../dip/dip.service';
import { CaseSummary, CaseSummaryEntity, ExpectedCompletion, UpdateCaseSummaryEntity } from './case-summary.interface';

export abstract class CaseSummaryRepositoryInterface {
  abstract getByCaseId(FkCaseId: number): Promise<CaseSummaryEntity | undefined>;
  abstract create(FkCaseId: number): Promise<number>;
  abstract update(FkCaseId: number, caseSummary: UpdateCaseSummaryEntity): Promise<void>;

  abstract getByCompletionDateRange(dateMin: string, dateMax: string): Promise<CaseSummaryEntity[]>;
}

@Injectable()
export class CaseSummaryService {
  constructor(
    private readonly caseSummaryRepository: CaseSummaryRepositoryInterface,
    private readonly underwritersService: UnderwritersService,
    private readonly caseIdentificationService: CasesIdentificationService,
    private readonly dipService: DipService
  ) {}

  async getByCaseId(FkCaseId: number): Promise<CaseSummary | undefined> {
    const caseSummary = await this.caseSummaryRepository.getByCaseId(FkCaseId);
    if (caseSummary === undefined) {
      return caseSummary;
    }
    const underwriter = await this.underwritersService.getOne(caseSummary.Underwriter);
    const riskAndMitigation = JSON.parse(caseSummary.Risk);
    return { ...caseSummary, underwriter, riskAndMitigation };
  }

  async createCaseSummary(FkCaseId: number): Promise<number> {
    const caseSummary = await this.caseSummaryRepository.getByCaseId(FkCaseId);
    if (caseSummary === undefined) {
      return this.caseSummaryRepository.create(FkCaseId);
    }
    return caseSummary.CaseOverviewId;
  }

  async updateExpectedCompletionDate(caseUuid: string, ExpectedCompletionDate: string): Promise<void> {
    const { CaseId } = await this.caseIdentificationService.getByCaseUuid(caseUuid);

    await this.caseSummaryRepository.update(CaseId, { ExpectedCompletionDate });
  }

  async getExpectedCompletions(dateMin: string, dateMax: string): Promise<ExpectedCompletion[]> {
    const caseSummaries = await this.caseSummaryRepository.getByCompletionDateRange(dateMin, dateMax);

    return Promise.all(
      caseSummaries.map(async (caseSummary) => {
        const dip = await this.dipService.getByCaseId(caseSummary.FkCaseId);
        return {
          netDayOne: dip.InitialNetLoanAmount,
          fees: dip.PremiumForLendersInsurance + dip.CompletionAdministrationFee,
          brokerFee: dip.IntermediaryCommissionFeeValue,
        };
      })
    );
  }
}

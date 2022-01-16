import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import { CaseSummaryEntity, UpdateCaseSummaryEntity } from './case-summary.interface';
import { CaseSummaryRepositoryInterface } from './case-summary.service';

@Injectable()
export class CaseSummaryRepository extends CaseSummaryRepositoryInterface {
  private caseSummaryTable = 'Origination.CaseOverview';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async getByCaseId(FkCaseId: number): Promise<CaseSummaryEntity | undefined> {
    const [caseSummary] = await this.knex(this.caseSummaryTable).where({ FkCaseId });
    if (caseSummary === undefined) {
      return undefined;
    }
    return caseSummary;
  }

  async create(FkCaseId: number): Promise<number> {
    return this.knex(this.caseSummaryTable).insert({ FkCaseId }, 'CaseOverviewId');
  }

  async update(FkCaseId: number, caseSummary: UpdateCaseSummaryEntity): Promise<void> {
    await this.knex(this.caseSummaryTable).update(caseSummary).where({ FkCaseId });
  }

  async getByCompletionDateRange(dateMin: string, dateMax: string): Promise<CaseSummaryEntity[]> {
    const query = this.knex(this.caseSummaryTable)
      .select<CaseSummaryEntity[]>()
      .where('ExpectedCompletionDate', '>', dateMin)
      .where('ExpectedCompletionDate', '<', dateMax)
      .orderBy('ExpectedCompletionDate');

    return query;
  }
}

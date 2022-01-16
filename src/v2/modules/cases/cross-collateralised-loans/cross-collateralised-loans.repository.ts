import { Injectable, Inject } from '@nestjs/common';
import { KnexInstance, KNEX_CONNECTION } from '@v2/utils/knex';

import {
  CreateCrossCollateralisedLoanEntity,
  CrossCollateralisedLoanEntity,
} from './cross-collateralised-loan.interface';
import { CrossCollateralisedLoansRepositoryInterface } from './cross-collateralised-loans.service';

@Injectable()
export class CrossCollateralisedLoansRepository extends CrossCollateralisedLoansRepositoryInterface {
  private CrossCollateralisedLoansTable = 'Origination.CrossCollateralisedLoans';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: KnexInstance) {
    super();
  }

  async create(CrossCollateralisedLoan: CreateCrossCollateralisedLoanEntity): Promise<number> {
    const [Id] = await this.knex(this.CrossCollateralisedLoansTable).insert(CrossCollateralisedLoan, [
      'CrossCollateralisedLoanId',
    ]);
    return Id;
  }

  async findAll(FkCaseId: number): Promise<CrossCollateralisedLoanEntity[]> {
    const query = this.knex(this.CrossCollateralisedLoansTable)
      .select<CrossCollateralisedLoanEntity[]>()
      .where({ FkCaseId })
      .orWhere({ FkOtherCaseId: FkCaseId })
      .orderBy('CreatedDate');

    return query;
  }

  async delete(FkCaseId: number, FkOtherCaseId: number): Promise<void> {
    await this.knex(this.CrossCollateralisedLoansTable)
      .delete()
      .where({ FkCaseId, FkOtherCaseId })
      .orWhere({ FkCaseId: FkOtherCaseId, FkOtherCaseId: FkCaseId });
  }

  async get(CrossCollateralisedLoanId: number): Promise<CrossCollateralisedLoanEntity> {
    const query = this.knex(this.CrossCollateralisedLoansTable)
      .select<CrossCollateralisedLoanEntity[]>()
      .where({ CrossCollateralisedLoanId });
    const [crossCollateralisedLoan] = await query;
    return crossCollateralisedLoan;
  }
}

import Knex from "knex";

import db from "../../../../db";
import CaseInterface from "../interfaces/case.interface";

export type CaseId = number;
export type CaseNumber = string;

export type CaseIdentification = { caseNumber?: CaseNumber; caseId?: CaseId };

export default class CaseRepository {
  knex: Knex;
  tableName = "Origination.Case";
  constructor(knex: Knex = db) {
    this.knex = knex;
  }
  public async getByIdentification(
    identification: CaseIdentification
  ): Promise<CaseInterface> {
    const condition = identification.caseId
      ? { CaseId: identification.caseId }
      : { Id: identification.caseNumber };
    const cases = await this.knex(this.tableName)
      .select<CaseInterface[]>()
      .where(condition);
    return cases[0];
  }
}

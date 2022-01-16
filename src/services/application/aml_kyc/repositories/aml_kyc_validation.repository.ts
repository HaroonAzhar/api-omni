import Knex from "knex";

import db from "../../../../db";
import AmlKycValidation from "../interfaces/aml_kyc_validation.interface";

export default class AmlKycValidationRepository {
  knex: Knex;
  tableName = "Origination.AmlKycValidation";
  constructor(knex: Knex = db) {
    this.knex = knex;
  }
  public async getByCaseId(FkCaseId: number): Promise<AmlKycValidation> {
    const amlKycValidations = await this.knex(this.tableName)
      .select<AmlKycValidation[]>()
      .where({ FkCaseId });
    const [amlKycValidation] = amlKycValidations;
    return amlKycValidation;
  }

  public async deleteByCaseId(FkCaseId: number) {
    await this.knex(this.tableName).delete().where({ FkCaseId });
  }

  public async create(amlKycValidation: AmlKycValidation, FkCaseId: number) {
    await this.knex(this.tableName).insert<AmlKycValidation[]>({
      ...amlKycValidation,
      FkCaseId,
    });
  }

  public async update(amlKycValidation: AmlKycValidation, FkCaseId: number) {
    await this.knex(this.tableName)
      .update<AmlKycValidation[]>({
        ...amlKycValidation,
      })
      .where({ FkCaseId });
  }
}

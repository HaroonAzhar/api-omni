import Knex from "knex";

import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";
import ApplicationStepStatusType from "../Application/ApplicationStepStatusType";

export default class ApplicantAsset extends BaseModel {
  getJsonMapping(): PropertiesInterface<Record<string, unknown>> {
    return {
      applicant_assets_liabilities_additional_id:
        "applicant_assets_liabilities_additional_id",
      total_assets: "total_assets",
      statement_of_financial_position: "statement_of_financial_position",
      total_liabilities: "total_liabilities",
      fk_applicant_id: "fk_applicant_id",
      status: async (db: Knex, value: string) => {
        const status = new ApplicationStepStatusType();
        const data = await status
          .select()
          .where({ ApplicationStepStatusType: value });
        if (!data.length) throw new Error("Cannot find status:" + value);
        return {
          key: "fk_status_id",
          value: data[0].application_step_status_id,
        };
      },
      date_edited: "date_edited",
    };
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        applicant_assets_liabilities_additional_id: "number|pk",
        total_liabilities: "number",
        total_assets: "number",
        statement_of_financial_position: "string",
        fk_applicant_id: "number",
        fk_status_id: "number",
        date_edited: "string",
      },
    };
  }

  public getByApplicant(applicantId: number) {
    return this.select([
      `${this.tableName()}.*`,
      "Origination.ApplicationStepStatusType.ApplicationStepStatusType as Status",
    ])
      .innerJoin(
        "Origination.Applicant",
        `${this.tableName()}.FkApplicantId`,
        "Applicant.ApplicantId"
      )
      .leftJoin(
        "Origination.ApplicationStepStatusType",
        `${this.tableName()}.FkStatusId`,
        "ApplicationStepStatusType.ApplicationStepStatusId"
      )
      .where({ ApplicantId: applicantId });
  }

  tableName(): string {
    return "Origination.ApplicantAssetsLiabilitiesAdditional";
  }
}

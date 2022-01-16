import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

export default class ApplicantAsset extends BaseModel {
  getJsonMapping(): PropertiesInterface<Record<string, unknown>> {
    return {
      type: "type",
      description: "description",
      gross_value: "gross_value",
      outstanding_debt: "outstanding_debt",
      net_value: "net_value",
      fk_applicant_id: "fk_applicant_id",
    };
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        applicant_asset_id: "number|pk",
        type: "string",
        description: "string",
        gross_value: "string",
        outstanding_debt: "string",
        net_value: "number",
        fk_applicant_id: "number",
      },
    };
  }

  public getByApplicant(applicantId: number) {
    return this.select()
      .innerJoin(
        "Origination.Applicant",
        `${this.tableName()}.FkApplicantId`,
        "Applicant.ApplicantId"
      )
      .where({ ApplicantId: applicantId });
  }

  public getByApplicantCompany(applicantId: number) {
    return this.select()
      .innerJoin(
        "Origination.ApplicantCompany",
        `${this.tableName()}.FkApplicantId`,
        "ApplicantCompany.ApplicantCompanyId"
      )
      .where({ ApplicantCompanyId: applicantId });
  }

  tableName(): string {
    return "Origination.ApplicantAsset";
  }
}

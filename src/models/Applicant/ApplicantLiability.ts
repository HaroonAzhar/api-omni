import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

export default class ApplicantLiability extends BaseModel {
  getJsonMapping(): PropertiesInterface<Record<string, unknown>> {
    return {
      type: "type",
      description: "description",
      net_value: "net_value",
      fk_applicant_id: "fk_applicant_id",
    };
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        applicant_liability_id: "number|pk",
        type: "string",
        description: "description",
        net_value: "net_value",
        fk_applicant_id: "fk_applicant_id",
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
    return "Origination.ApplicantLiability";
  }
}

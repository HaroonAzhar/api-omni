import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

export default class ApplicantAccountant extends BaseModel {
  getJsonMapping(): PropertiesInterface<Record<string, unknown>> {
    return {
      name: "name",
      surname: "surname",
      firm: "firm",
      qualification: "qualification",
    };
  }

  jsonSchema(): JsonSchemaInterface<any> {
    return {
      type: "object",
      required: [],
      properties: {
        applicant_accountant_id: "number|pk",
        name: "string",
        surname: "string",
        firm: "firm",
        qualification: "string",
        fk_applicant_id: "string",
        fk_adress_id: "number",
      },
    };
  }

  public getByApplicant(id: number) {
    return this.select(["ApplicantAccountant.*"]).where({ FkApplicantId: id });
  }

  tableName(): string {
    return "Origination.ApplicantAccountant";
  }
}

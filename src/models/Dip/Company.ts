import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type CompanyType = {
  company_id: "number|pk";
  company_number: "string";
};

export default class Company extends BaseModel {
  tableName(): string {
    return "Origination.DipCompany";
  }

  getJsonMapping(): PropertiesInterface<CompanyType> {
    return undefined;
  }

  jsonSchema(): JsonSchemaInterface<CompanyType> {
    return {
      type: "object",
      required: [],
      properties: {
        company_id: "number|pk",
        company_number: "string",
      },
    };
  }
}

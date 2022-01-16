import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type LoanTypeType = {
  loan_type_id: "number|pk";
  loan_type: "string";
};

export default class LoanType extends BaseModel {
  tableName(): string {
    return "Origination.DipLoanType";
  }

  getJsonMapping(): LoanTypeType {
    return undefined;
  }

  jsonSchema(): JsonSchemaInterface<LoanTypeType> {
    return {
      type: "object",
      required: [],
      properties: {
        loan_type_id: "number|pk",
        loan_type: "string",
      },
    };
  }
}

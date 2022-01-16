import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type LoanAdvanceTypeType = {
  loan_advance_type_id: "number|pk";
  advance_type: "string";
};

export default class LoanAdvanceType extends BaseModel {
  getJsonMapping(): PropertiesInterface<LoanAdvanceTypeType> {
    return undefined;
  }

  tableName(): string {
    return "Origination.DipLoanAdvanceType";
  }

  jsonSchema(): JsonSchemaInterface<LoanAdvanceTypeType> {
    return {
      type: "object",
      required: [],
      properties: {
        loan_advance_type_id: "number|pk",
        advance_type: "string",
      },
    };
  }
}

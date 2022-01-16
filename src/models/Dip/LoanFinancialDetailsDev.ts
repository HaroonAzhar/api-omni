import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type LoanFinancialDetailsDevType = {
  loan_financial_details_dev_id: "pk|number";
  ltv_to_gdv: "number";
};

export default class LoanFinancialDetailsDev extends BaseModel {
  tableName(): string {
    return "Origination.DipLoanFinancialDetailsDev";
  }

  getJsonMapping(): PropertiesInterface<LoanFinancialDetailsDevType> {
    return undefined;
  }

  jsonSchema(): JsonSchemaInterface<LoanFinancialDetailsDevType> {
    return {
      type: "object",
      required: [],
      properties: {
        loan_financial_details_dev_id: "pk|number",
        ltv_to_gdv: "number",
      },
    };
  }
}

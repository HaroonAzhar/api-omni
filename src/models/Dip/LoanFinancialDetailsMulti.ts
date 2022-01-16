import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type LoanFinancialDetailsMultiType = {
  loan_financial_details_multi_id: "number|pk";
  further_draw_downs: "number";
};

export default class LoanFinancialDetailsMulti extends BaseModel {
  tableName(): string {
    return "Origination.DipLoanFinancialDetailsMulti";
  }

  getJsonMapping(): PropertiesInterface<LoanFinancialDetailsMultiType> {
    return {
      further_draw_downs: "further_draw_downs",
    };
  }

  jsonSchema(): JsonSchemaInterface<LoanFinancialDetailsMultiType> {
    return {
      type: "object",
      required: [],
      properties: {
        loan_financial_details_multi_id: "number|pk",
        further_draw_downs: "number",
      },
    };
  }
}

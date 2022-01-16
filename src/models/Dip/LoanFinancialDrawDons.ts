import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

export type LoanFinancialDrawDonsType = {
  loan_financial_draw_downs_id: "number|pk";
  advance: "number";
  arr_fee_out: "number";
  date: "datetime";
  end_bal: "number";
  gross_ltgdv: "number";
  gross_ltv: "number";
  interest: "number";
  interest_paid: "number";
  total_fees: "number";
  fk_loan_financial_details_id: "number";
};

export default class LoanFinancialDrawDowns extends BaseModel {
  getJsonMapping(): PropertiesInterface<LoanFinancialDrawDonsType> {
    return undefined;
  }

  jsonSchema(): JsonSchemaInterface<LoanFinancialDrawDonsType> {
    return {
      type: "object",
      required: [],
      properties: {
        loan_financial_draw_downs_id: "number|pk",
        advance: "number",
        arr_fee_out: "number",
        date: "datetime",
        end_bal: "number",
        gross_ltgdv: "number",
        gross_ltv: "number",
        interest: "number",
        interest_paid: "number",
        total_fees: "number",
        fk_loan_financial_details_id: "number",
      },
    };
  }

  tableName(): string {
    return "Origination.DipLoanFinancialDrawDowns";
  }
}

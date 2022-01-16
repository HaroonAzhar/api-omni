import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type LoanFinancialHybridTermsType = {
  loan_financial_hybrid_terms_id: "number|pk";
  retained: "number";
  serviced: "number";
  rolled_up: "number";
};

export default class LoanFinancialHybridTerms extends BaseModel {
  tableName(): string {
    return "Origination.DipLoanFinancialHybridTerms";
  }

  getJsonMapping(): PropertiesInterface<LoanFinancialHybridTermsType> {
    return {
      retained: "retained",
      serviced: "serviced",
      rolled_up: "rolled_up",
    };
  }

  jsonSchema(): JsonSchemaInterface<LoanFinancialHybridTermsType> {
    return {
      type: "object",
      required: [],
      properties: {
        loan_financial_hybrid_terms_id: "number|pk",
        retained: "number",
        serviced: "number",
        rolled_up: "number",
      },
    };
  }
}

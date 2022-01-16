import Knex from "knex";

import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";

type LoanPropertyDevelopmentType = {
  loan_property_development_id: "number|pk";
  build_period_months: "number";
  appraisal_report: "number";
  monthly_drawdown_report: "number";
  progress_report: "number";
};

export default class LoanPropertyDevelopment extends BaseModel {
  tableName(): string {
    return "Origination.DipLoanPropertyDevelopment";
  }

  getJsonMapping(): PropertiesInterface<LoanPropertyDevelopmentType> {
    return {
      appraisal_report: async (db: Knex, value: string | number | []) => {
        if (value === "N/A") value = null;
        return {
          key: "appraisal_report",
          value: value,
        };
      },
      build_period: "build_period_months",
      progress_report: (db: Knex, value: string | number | []) => {
        if (value === "N/A") value = null;
        return {
          key: "progress_report",
          value: value,
        };
      },
    };
  }

  jsonSchema(): JsonSchemaInterface<LoanPropertyDevelopmentType> {
    return {
      type: "object",
      required: [],
      properties: {
        loan_property_development_id: "number|pk",
        build_period_months: "number",
        appraisal_report: "number",
        monthly_drawdown_report: "number",
        progress_report: "number",
      },
    };
  }
}

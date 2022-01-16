import Knex from "knex";

import { BaseModel } from "../BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../../interfaces/models/JsonSchemaInterface";
import LoanFinancialDetailsDev from "./LoanFinancialDetailsDev";
import LoanFinancialDrawDowns, {
  LoanFinancialDrawDonsType,
} from "./LoanFinancialDrawDons";

type LoanFinancialDetailsType = {
  loan_financial_details_id: "number|pk";
  broker_fee_in_value: "float";
  broker_fee_out_value: "float";
  gross_amount_of_first_advance: "float";
  gross_amount_at_maturity: "float";
  total_interest: "float";
  gross_amount_for_ltv: "float";
  arrangement_fee_retained_value: "float";
  exit_fee_retained_value: "float";
  serviced_interest_total: "float";
  total_loan_facility_excluding_interest: "float";
  gross_day_one_ltv: "float";
  gross_loan_first_advance: "float";
  max_total_net_loan_available: "float";
  total_fees: "float";
  total_loan_amount: "float";
  total_loan_facility: "float";
  loan_term: "number";
  initial_net_loan_amount: "number";
  gross_total_loan_amount: "number";
  market_value: "number";
  purchase_price: "number";
  arrangement_fee: "number";
  interest_rate: "number";
  title_insurance_fee: "number";
  legal_fee: "number";
  premium_for_lenders_insurance: "number";
  completion_administration_fee: "float";
  arrangement_fee_repayment: "number";
  max_ltv_day_one: "number";
  estimated_interest: "number";
  starting_point: "string";
  arrangement_fee_input: "number";
  arrangement_fee_repayment_input: "number";
  initial_net_loan_amount_input: "number";
  loan_purpose: "string";
  start_date: "string";
  further_advances: "string";
  value_type_of_loan_amount: "value_type_of_loan_amount";
  arrangement_fee_percent: "number";
  is_manual_mode: "boolean";
  fk_loan_financial_details_dev_id: "number";
  fk_loan_financial_details_multi_id: "number";
  fk_hybrid_terms: "number";
  further_draw_downs_borrowing: "number";
  initial_net_loan: "number";
  term: "number";
  purpose_of_borrowings: "string";
  source_of_deposit: "string";
  repayment_method: "string";
  repayment_method_details: "string";
  proposed_completion_date: "string";
  exit_fee_intermediary: "string";
  xirr: "number";
  repayment_date: "string";
  maturity_date: "string";
  gdltv: "number";
  intermediary_commission_fee_value: "number";
  intermediary_commission_fee_percent: "number";
};

type calculatorResponse = {
  advanced_interest: number;
  arrangement_fee_in_value: number;
  broker_fee_in_value: number;
  broker_fee_out_value: number;
  drawdowns: LoanFinancialDrawDonsType[];
  exit_fee_value: number;
  gross_amount_of_first_advance: number;
  gross_amount_at_maturity: number;
  total_interest: number;
  gross_amount_for_ltv: number;
  arrangement_fee_retained_value: number;
  exit_fee_retained_value: number;
  serviced_interest_total: number;
  total_loan_facility_excluding_interest: number;
  gross_day_one_ltv: number;
  gross_loan: number;
  gross_loan_first_advance: number;
  intermediary_commission_fee_value: number;
  max_total_net_loan_available: number;
  net_amount_of_first_advance: number;
  total_fees: number;
  total_loan_amount: number;
  total_loan_facility: number;
  xirr: number;
  repayment_date: string;
  maturity_date: string;
  gdltv: number;
};

export default class LoanFinancialDetails extends BaseModel {
  private _loanFinancialDetailsDevId: number;
  tableName(): string {
    return "Origination.DipLoanFinancialDetails";
  }

  set loanFinancialDetailsDevId(id: number) {
    this._loanFinancialDetailsDevId = id;
  }

  jsonSchema(): JsonSchemaInterface<LoanFinancialDetailsType> {
    return {
      type: "object",
      required: [],
      properties: {
        loan_financial_details_id: "number|pk",
        broker_fee_in_value: "float",
        broker_fee_out_value: "float",
        gross_amount_of_first_advance: "float",
        gross_amount_at_maturity: "float",
        total_interest: "float",
        serviced_interest_total: "float",
        gross_amount_for_ltv: "float",
        arrangement_fee_retained_value: "float",
        exit_fee_retained_value: "float",
        total_loan_facility_excluding_interest: "float",
        gross_day_one_ltv: "float",
        gross_loan_first_advance: "float",
        max_total_net_loan_available: "float",
        total_fees: "float",
        total_loan_amount: "float",
        total_loan_facility: "float",
        loan_term: "number",
        initial_net_loan_amount: "number",
        gross_total_loan_amount: "number",
        market_value: "number",
        purchase_price: "number",
        arrangement_fee: "number",
        interest_rate: "number",
        title_insurance_fee: "number",
        legal_fee: "number",
        premium_for_lenders_insurance: "number",
        completion_administration_fee: "float",
        arrangement_fee_repayment: "number",
        max_ltv_day_one: "number",
        estimated_interest: "number",
        starting_point: "string",
        arrangement_fee_input: "number",
        arrangement_fee_repayment_input: "number",
        initial_net_loan_amount_input: "number",
        loan_purpose: "string",
        start_date: "string",
        further_advances: "string",
        value_type_of_loan_amount: "value_type_of_loan_amount",
        arrangement_fee_percent: "number",
        is_manual_mode: "boolean",
        further_draw_downs_borrowing: "number",
        initial_net_loan: "number",
        term: "number",
        purpose_of_borrowings: "string",
        source_of_deposit: "string",
        repayment_method: "string",
        repayment_method_details: "string",
        proposed_completion_date: "string",
        exit_fee_intermediary: "string",
        fk_loan_financial_details_dev_id: "number",
        fk_loan_financial_details_multi_id: "number",
        fk_hybrid_terms: "number",
        xirr: "number",
        repayment_date: "string",
        maturity_date: "string",
        gdltv: "number",
        intermediary_commission_fee_value: "number",
        intermediary_commission_fee_percent: "number",
      },
    };
  }

  getJsonMapping(): PropertiesInterface<LoanFinancialDetailsType> {
    return {
      loan_term: "loan_term",
      initial_net_loan_amount: "initial_net_loan_amount_input",
      net_loan_amount: "initial_net_loan_amount",
      gross_loan_amount: "gross_total_loan_amount",
      purchase_price: "purchase_price",
      market_value: "market_value",
      arrangement_fee_in_value: "arrangement_fee",
      advanced_interest: "estimated_interest",
      broker_fee_in_value: "broker_fee_in_value",
      broker_fee_out_value: "broker_fee_out_value",
      exit_fee_value: "arrangement_fee_repayment",
      gross_amount_of_first_advance: "gross_amount_of_first_advance",
      total_interest: "total_interest",
      gross_amount_for_ltv: "gross_amount_for_ltv",
      arrangement_fee_retained_value: "arrangement_fee_retained_value",
      exit_fee_retained_value: "exit_fee_retained_value",
      serviced_interest_total: "serviced_interest_total",
      total_loan_facility_excluding_interest:
        "total_loan_facility_excluding_interest",
      gross_day_one_ltv: "gross_day_one_ltv",
      gross_loan: "gross_total_loan_amount",
      gross_loan_first_advance: "gross_loan_first_advance",
      max_total_net_loan_available: "max_total_net_loan_available",
      net_amount_of_first_advance: "initial_net_loan_amount",
      total_fees: "total_fees",
      total_loan_amount: "total_loan_amount",
      total_loan_facility: "total_loan_facility",
      arrangement_fee_advance_date_value: "arrangement_fee_input",
      arrangement_fee_advance_date_percent: "arrangement_fee_percent",
      arrangement_fee_repayment_date_value: "arrangement_fee_repayment_input",
      start_date: "start_date",
      further_advances: (db: Knex, value: string) => {
        return {
          key: "further_advances",
          value: JSON.stringify(value),
        };
      },
      interest_rate: "interest_rate",
      title_insurance_fee: "title_insurance_fee",
      estimated_interest: "estimated_interest",
      legal_fee: "legal_fee",
      intermediary_commission_fee_value: "intermediary_commission_fee_value",
      intermediary_commission_fee_percent:
        "intermediary_commission_fee_percent",
      premium_for_lenders_insurance: "premium_for_lenders_insurance",
      completion_administration_fee: "completion_administration_fee",
      max_ltv: "max_ltv_day_one",
      starting_point: "starting_point",
      loan_purpose: "loan_purpose",
      value_type_of_loan_amount: "value_type_of_loan_amount",
      is_manual_mode: "is_manual_mode",
      further_draw_downs_borrowing: "further_draw_downs_borrowing",
      initial_net_loan: "initial_net_loan",
      term: "term",
      purpose_of_borrowings: "purpose_of_borrowings",
      source_of_deposit: "source_of_deposit",
      repayment_method: "repayment_method",
      repayment_method_details: "repayment_method_details",
      proposed_completion_date: "proposed_completion_date",
      exit_fee_intermediary: "exit_fee_intermediary",
      xirr: "xirr",
      repayment_date: "repayment_date",
      maturity_date: "maturity_date",
      gdltv: "gdltv",
      calculator_response: async (
        db: Knex,
        value: PropertiesInterface<calculatorResponse>
      ): Promise<[]> => {
        const model = new LoanFinancialDetails();
        const drawdowns = new LoanFinancialDrawDowns();
        await drawdowns.delete().where({ FkLoanFinancialDetailsId: this._id });

        if (
          value.hasOwnProperty("drawdowns") &&
          Array.isArray(value.drawdowns)
        ) {
          for (const drawdownItem of value.drawdowns as any) {
            drawdowns.setData("advance", drawdownItem.advance);
            drawdowns.setData("arr_fee_out", drawdownItem.arr_fee_out);
            if (
              typeof drawdownItem.date === "string" &&
              drawdownItem.date.length === 0
            )
              drawdownItem.date = null;
            drawdowns.setData("date", drawdownItem.date);
            drawdowns.setData("end_bal", drawdownItem.end_bal);
            drawdowns.setData("gross_ltgdv", drawdownItem.gross_ltgdv);
            drawdowns.setData("gross_ltv", drawdownItem.gross_ltv);
            drawdowns.setData("interest", drawdownItem.interest);
            drawdowns.setData("interest_paid", drawdownItem.interest_paid);
            drawdowns.setData("total_fees", drawdownItem.total_fees);
            drawdowns.setData("fk_loan_financial_details_id", this._id);
            await drawdowns.insert();
          }
        }

        await model.setJsonObject(value);
        model.setData(
          "gross_amount_at_maturity",
          value.gross_amount_at_maturity
        );
        await model.update().where({ LoanFinancialDetailsId: this._id });
        return [];
      },
      ltv_to_gdv: async (db: Knex, value: string) => {
        const loanFinancialDetailDev = new LoanFinancialDetailsDev();
        loanFinancialDetailDev.setData("ltv_to_gdv", value);
        await loanFinancialDetailDev.update().where({
          LoanFinancialDetailsDevId: this._loanFinancialDetailsDevId,
        });

        return {
          key: "fk_loan_financial_details_dev_id",
          value: this._loanFinancialDetailsDevId,
        };
      },
    };
  }
}

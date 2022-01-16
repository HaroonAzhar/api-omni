import * as Knex from "knex";

const financialColumns = `initial_net_loan_amount
gross_total_loan_amount
market_value
arrangement_fee
premium_for_lenders_insurance
arrangement_fee_repayment
estimated_interest
completion_administration_fee
broker_fee_in_value
broker_fee_out_value
gross_amount_of_first_advance
gross_day_one_ltv
gross_loan_first_advance
max_total_net_loan_available
total_fees
total_loan_amount
total_loan_facility
initial_net_loan_amount_input
arrangement_fee_input
arrangement_fee_repayment_input`.split("\n");

exports.up = async (knex: Knex) => {
  for (const columnName of financialColumns) {
    await knex.schema.alterTable(
      "Origination_DIP_LoanFinancialDetails",
      async (table) => {
        await table.decimal(columnName, 38, 4).alter();
      }
    );
  }

  await knex.schema.alterTable("Origination_DIP_Security", async (table) => {
    await table.decimal("security_initial_estimation", 38, 4).alter();
  });
};

exports.down = async (knex: Knex) => {
  for (const columnName of financialColumns) {
    await knex.schema.alterTable(
      "Origination_DIP_LoanFinancialDetails",
      async (table) => {
        await table.float(columnName).alter();
      }
    );
  }

  await knex.schema.alterTable("Origination_DIP_Security", async (table) => {
    await table.float("security_initial_estimation").alter();
  });
};

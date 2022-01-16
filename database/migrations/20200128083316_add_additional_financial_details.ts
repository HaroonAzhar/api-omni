import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.float("gross_total_loan_amount").alter();
    }
  );

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.float("arrangement_fee_repayment").alter();
    }
  );

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.float("estimated_interest").alter();
    }
  );

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.float("arrangement_fee").alter();
    }
  );

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.float("broker_fee_in_value");
      table.float("broker_fee_out_value");
      table.float("gross_amount_of_first_advance");
      table.float("gross_day_one_ltv");
      table.float("gross_loan_first_advance");
      table.float("max_total_net_loan_available");
      table.float("total_fees");
      table.float("total_loan_amount");
      table.float("total_loan_facility");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.integer("gross_total_loan_amount").alter();
    }
  );

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.integer("arrangement_fee_repayment").alter();
    }
  );

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.integer("estimated_interest").alter();
    }
  );

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.integer("arrangement_fee").alter();
    }
  );

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.integer("arrangement_fee").alter();
      table.integer("estimated_interest").alter();
      table.dropColumn("broker_fee_in_value");
      table.dropColumn("broker_fee_out_value");
      table.dropColumn("gross_amount_of_first_advance");
      table.dropColumn("gross_day_one_ltv");
      table.dropColumn("gross_loan_first_advance");
      table.dropColumn("max_total_net_loan_available");
      table.dropColumn("total_fees");
      table.dropColumn("total_loan_amount");
      table.dropColumn("total_loan_facility");
    }
  );
};

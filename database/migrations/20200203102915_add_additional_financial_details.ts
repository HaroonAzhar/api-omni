import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.string("starting_point", 100);
      table.float("initial_net_loan_amount_input");
      table.float("arrangement_fee_input");
      table.float("arrangement_fee_repayment_input");
    }
  );

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.float("initial_net_loan_amount").alter();
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.dropColumn("starting_point");
      table.dropColumn("arrangement_fee_input");
      table.dropColumn("initial_net_loan_amount_input");
      table.dropColumn("arrangement_fee_repayment_input");
    }
  );

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.integer("initial_net_loan_amount").alter();
    }
  );
};

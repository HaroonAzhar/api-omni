import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    (table) => {
      table.string("RepaymentMethodDetails", 400);
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    (table) => {
      table.dropColumn("RepaymentMethodDetails");
    }
  );
};

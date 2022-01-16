import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    async (table) => {
      await table.integer("arrangement_fee_percent");
    }
  );

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    async (table) => {
      await table.integer("arrangement_fee_repayment_percent");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    async (table) => {
      await table.dropColumn("arrangement_fee_percent");
      await table.dropColumn("arrangement_fee_repayment_percent");
    }
  );
};

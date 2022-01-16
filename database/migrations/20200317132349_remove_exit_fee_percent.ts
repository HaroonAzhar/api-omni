import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.dropColumn("ArrangementFeeRepaymentPercent");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.decimal("ArrangementFeeRepaymentPercent", 38, 4);
    }
  );
};

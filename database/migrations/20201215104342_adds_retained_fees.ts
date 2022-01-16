import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    (table) => {
      table.decimal("ArrangementFeeRetainedValue", 38, 4);
      table.decimal("ExitFeeRetainedValue", 38, 4);
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    (table) => {
      table.dropColumn("ArrangementFeeRetainedValue");
      table.dropColumn("ExitFeeRetainedValue");
    }
  );
};

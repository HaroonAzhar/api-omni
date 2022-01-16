import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    (table) => {
      table.decimal("Xirr", 38, 4);
      table.string("RepaymentDate");
      table.string("MaturityDate");
      table.decimal("Gdltv", 38, 4);
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    (table) => {
      table.dropColumn("Xirr");
      table.dropColumn("RepaymentDate");
      table.dropColumn("MaturityDate");
      table.dropColumn("Gdltv");
    }
  );
};

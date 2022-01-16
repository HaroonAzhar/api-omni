import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDrawDowns",
    async (table) => {
      await table.string("Date").alter();
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDrawDowns",
    async (table) => {
      await table.dateTime("Date").alter();
    }
  );
};

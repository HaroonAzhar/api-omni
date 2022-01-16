import * as Knex from "knex";

const tableName = "Origination.DipLoanFinancialDetails";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, async (table) => {
    table.decimal("Gdltv90Day", 38, 4);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, async (table) => {
    table.dropColumn("Gdltv90Day");
  });
};

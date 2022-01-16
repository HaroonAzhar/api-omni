import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.Completed", (table) => {
    table.decimal("LastStatementBalance", 38, 4);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.Completed", (table) => {
    table.dropColumn("LastStatementBalance");
  });
};

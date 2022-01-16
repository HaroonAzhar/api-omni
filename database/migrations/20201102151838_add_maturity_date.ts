import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.Completed", (table) => {
    table.date("DateOfMaturity");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.Completed", (table) => {
    table.dropColumn("DateOfMaturity");
  });
};

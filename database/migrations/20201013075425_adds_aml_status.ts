import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.string("Status");
  });
};

exports.down = async (knex: Knex) =>
  await knex.schema.alterTable("Origination.AmlKyc", async (table) => {
    table.dropColumn("Status");
  });

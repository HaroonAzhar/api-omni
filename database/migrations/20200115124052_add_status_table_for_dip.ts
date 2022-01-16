import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination_DIP_Status", (table) => {
    table.increments("status_id").primary();
    table.string("status", 255).unique();
  });

  await knex.schema.alterTable("Origination_DIP_DIP", (table) => {
    table.integer("fk_status_id");
    table
      .foreign("fk_status_id")
      .references("status_id")
      .inTable("Origination_DIP_Status");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination_DIP_DIP", (table) => {
    table.dropForeign(["fk_status_id"]);
    table.dropColumn("fk_status_id");
  });

  await knex.schema.dropTable("Origination_DIP_Status");
};

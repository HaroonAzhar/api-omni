import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.Commands", (table) => {
    table.increments("CommandId").primary();

    table.text("Trigger");
    table.string("User");
    table.timestamp("CreatedDate").defaultTo(knex.fn.now());
    table.string("Name");

    table.text("Content");

    table.text("Module");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.Commands");
};

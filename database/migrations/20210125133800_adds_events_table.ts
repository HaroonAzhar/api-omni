import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.Events", (table) => {
    table.increments("EventId").primary();

    table.integer("FkCommandId");
    table
      .foreign("FkCommandId")
      .references("CommandId")
      .inTable("Servicing.Commands");
    table.timestamp("CreatedDate").defaultTo(knex.fn.now());
    table.string("Name");

    table.text("Content");

    table.string("Module");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.Events");
};

import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.DefaultEvents", (table) => {
    table.increments("DefaultEventId").primary();

    table.integer("FkCompletedId");
    table.index("FkCompletedId");
    table
      .foreign("FkCompletedId")
      .references("CompletedId")
      .inTable("Servicing.Completed");

    table.timestamp("CreatedDate").defaultTo(knex.fn.now());

    table.timestamp("Date").defaultTo(knex.fn.now());
    table.string("Type");
    table.boolean("IsDeleted");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.DefaultEvents");
};

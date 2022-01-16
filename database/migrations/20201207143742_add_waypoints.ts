import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.Waypoints", (table) => {
    table.increments("WaypointId").primary();

    table.integer("FkCompletedId");
    table.index("FkCompletedId");
    table
      .foreign("FkCompletedId")
      .references("CompletedId")
      .inTable("Servicing.Completed");

    table.timestamp("CreatedDate").defaultTo(knex.fn.now());

    table.string("Name");
    table.date("DueDate");
    table.time("DueTime");
    table.boolean("IsCompleted");
    table.string("Category");
    table.text("Notes");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.Waypoints");
};

import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.Notes", (table) => {
    table.increments("NoteId").primary();

    table.integer("FkCompletedId");
    table.index("FkCompletedId");
    table
      .foreign("FkCompletedId")
      .references("CompletedId")
      .inTable("Servicing.Completed");

    table.timestamp("CreatedDate").defaultTo(knex.fn.now());

    table.string("CreatedBy");
    table.text("Text");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.Notes");
};

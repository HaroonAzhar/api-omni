import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.SecurityNotes", (table) => {
    table.increments("SecurityNoteId").primary();

    table.integer("FkSecurityId").notNullable();
    table.index("FkSecurityId");
    table
      .foreign("FkSecurityId")
      .references("SecurityId")
      .inTable("Servicing.Securities");

    table.text("Text");
    table.string("CreatedBy");

    table.timestamp("CreatedDate").defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.SecurityNotes");
};

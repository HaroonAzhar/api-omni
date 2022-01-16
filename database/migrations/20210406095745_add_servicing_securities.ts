import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.Securities", (table) => {
    table.increments("SecurityId").primary();

    table.integer("FkCompletedId").notNullable();
    table.index("FkCompletedId");
    table
      .foreign("FkCompletedId")
      .references("CompletedId")
      .inTable("Servicing.Completed");

    table.integer("FkCasePropertyId").notNullable();
    table.index("FkCasePropertyId");
    table
      .foreign("FkCasePropertyId")
      .references("CasePropertyId")
      .inTable("Origination.CaseProperty");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.Securities");
};

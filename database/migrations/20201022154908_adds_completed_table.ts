import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.Completed", (table) => {
    table.increments("CompletedId").primary();

    table.integer("FkCaseId");
    table.index("FkCaseId");
    table.foreign("FkCaseId").references("CaseId").inTable("Origination.Case");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.Completed");
};
